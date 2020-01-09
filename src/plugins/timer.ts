import { CronJob as cronJob } from 'cron';
import Daruk from '../core/daruk';
import loader from '../core/loader';

export default (daruk: Daruk) => {
  let timer = loader.loadModule('timer', daruk.options.timerPath);
  daruk.mergeModule('timer', timer);
  daruk.emit('timerLoaded', daruk);
  timer = daruk.module.timer || {};
  const defaultJob = {
    start: true,
    // https://www.zeitverschiebung.net/cn/all-time-zones.html
    timeZone: 'Asia/Shanghai'
  };
  Object.keys(timer).forEach(function initTimer(jobName: string) {
    let job = timer[jobName](daruk);
    job = { ...defaultJob, ...job };
    job.export = new cronJob(
      job.cronTime,
      job.onTick,
      job.onComplete,
      job.start,
      job.timezone,
      job.export,
      job.runOninit
    );
  });
};
