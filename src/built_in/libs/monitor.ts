/**
 * @fileOverview v8 分析中间件的依赖
 */

import EventEmitter = require('events');
import fs = require('fs');
import os = require('os');
let v8Analytics: any;
let v8memAnalytics: any;
let profiler: any;
const defaultPeriod = 2000;
const cpuFull = 100;

class Monitor extends EventEmitter {
  public deviceCpuProfiler: any;
  public processCpuProfiler: any;
  public processMemoryUsage: any;
  public constructor(options: { v8AnalyticsPath: string; v8ProfilerPath: string }) {
    super();
    const { v8AnalyticsPath, v8ProfilerPath } = options;
    v8Analytics = require(v8AnalyticsPath);
    v8memAnalytics = require(`${v8AnalyticsPath}/lib/mem_analysis.js`);
    profiler = require(v8ProfilerPath);
  }
  /**
   * 计算某个时间段内 process cpu使用情况
   * @param pid 进程Pid
   * @param period 记录多少秒内的cpu使用率
   */
  public computeProcessCpu(pid: number, period: number) {
    const startTime = process.hrtime();
    const startUsage = process.cpuUsage();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let elapTimeMS = hrtimeToMS(process.hrtime(startTime)); // 整体cpu运行时间
        let elapUsageMS = usageToTotalUsageMS(process.cpuUsage(startUsage)); // 进程使用cpu的时间
        let cpuPercent = ((cpuFull * elapUsageMS) / elapTimeMS).toFixed(1);
        let result = {
          elapTimeMS,
          elapUsageMS,
          cpuPercent,
          period
        };
        resolve(result);
      }, period);
    });
  }
  // 计算整个机器cpu使用情况
  public computeDeviceCpu() {
    // 综合统计信息保存
    const cpuUsage = os.cpus();
    const statics = { user: 0, sys: 0, idle: 0, all: 0 };

    // 获取所有的 user，sys 和 idle 的 cpu 时间片
    cpuUsage.forEach((c: any) => {
      const times = c.times;
      const user = Number(times.user);
      const nice = Number(times.nice);
      const sys = Number(times.sys);
      const idle = Number(times.idle);
      const irq = Number(times.irq);

      // 进行计数统计
      statics.user = statics.user + user;
      statics.sys = statics.sys + sys;
      statics.idle = statics.idle + idle;
      statics.all = statics.all + user + nice + sys + idle + irq;
    });

    // 返回各部分占比
    return {
      userPercent: (statics.user / statics.all).toFixed(2),
      sysPercent: (statics.sys / statics.all).toFixed(2),
      idlePercent: (statics.idle / statics.all).toFixed(2)
    };
  }
  // 记录进程的内存使用情况
  /**
     * @returns { rss: ,        // 总内存占用 包含堆、栈与代码段等
                 heapTotal: ,  // 堆的总内存，包括用到的和没用到的。
                 heapUsed: ,   // 用到的堆的部分
                 external: }   // V8 引擎内部的 C++ 对象占用的内存。
     */
  public computeMemoryUsage() {
    let memoryUsage: any = process.memoryUsage();
    return {
      rss: bytesToMB(memoryUsage.rss),
      heapTotal: bytesToMB(memoryUsage.heapTotal),
      heapUsed: bytesToMB(memoryUsage.heapUsed),
      external: bytesToMB(memoryUsage.external)
    };
  }
  /**
   * 统计所有的cpu的性能情况以及内存的用量
   * @param period 时期内
   */
  public computePerf(period: number) {
    this.deviceCpuProfiler = this.computeDeviceCpu();
    this.processMemoryUsage = this.computeMemoryUsage();
    return new Promise((resolve, reject) => {
      this.computeProcessCpu(process.pid, period).then((processProfiler) => {
        let res = {
          cpu: {
            device: this.deviceCpuProfiler,
            process: processProfiler
          },
          memory: this.processMemoryUsage
        };
        resolve(res);
      });
    });
  }
  /**
   * 统计某个时间段内的function执行耗时
   * @param period 时间段
   */
  public functionProfiler(period: number) {
    profiler.startProfiling('cpu', true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let profile1 = profiler.stopProfiling();
        profile1.export((error: any, result: any) => {
          createDir('profiler');
          fs.writeFileSync('profiler/profile.cpu.json', result);
          // list all js function and it's execTime
          const execTime = 30;
          let snapshotJson = JSON.parse(result);
          let str = v8Analytics(snapshotJson, execTime);
          profile1.delete();
          resolve(str);
        });
      }, period);
    });
  }
  /**
   * 获取内存快照
   */
  public memSnapshot() {
    let snapshot = profiler.takeSnapshot();
    // console.log(snapshot.getHeader())
    return new Promise((resolve) => {
      snapshot.export((error: any, result: any) => {
        createDir('profiler');
        fs.writeFileSync('profiler/profile.mem.heapsnapshot', result);
        snapshot.delete();
        resolve(result);
      });
    });
  }
  /**
   * 分析内存快照
   */
  public memSnapshotAnalytics() {
    return new Promise((resolve) => {
      this.memSnapshot().then((res: any) => {
        let json = JSON.parse(res);
        resolve(v8memAnalytics(json));
      });
    });
  }
  /**
   * 处理路由中间件
   */
  public getAnalytics(ctx: any) {
    let url: string = ctx.request.url.split('?')[0];
    let period = ctx.query.period || defaultPeriod;
    // console.log('url:', url)
    switch (url) {
      case '/monitor/profiler':
        return this.computePerf(period);
      case '/monitor/profiler/function':
        return this.functionProfiler(period);
      case '/monitor/profiler/mem':
        ctx.set('Content-disposition', 'attachment;filename=' + 'profiler.mem.heapsnapshot'); // 设置你的文件名
        return this.memSnapshot();
      case '/monitor/profiler/mem-analytics':
        return this.memSnapshotAnalytics();
      default:
        return;
    }
  }
}

// 通过使用信息计算cpu的总使用率
function usageToTotalUsageMS(elapUsage: any) {
  const unit = 1000;
  let elapUserMS = elapUsage.user / unit; // microseconds to milliseconds
  let elapSystMS = elapUsage.system / unit;
  return elapUserMS + elapSystMS;
}

// 将microseconds 转换为 milliseconds 更高的精度
function hrtimeToMS(hrtime: any) {
  const unit1 = 1000;
  const unit2 = 1000000;
  return hrtime[0] * unit1 + hrtime[1] / unit2;
}

function bytesToMB(bytes: number) {
  const unit = 1024;
  return (bytes / unit / unit).toFixed(2);
}

function createDir(dirName: string) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
}
export default Monitor;
