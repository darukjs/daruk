/**
 * @fileOverview daruk 加载约定目录的模块
 */

import assert = require('assert');
import fs = require('fs');
import is = require('is');
import path = require('path');
import { normalize } from 'upath';
import { Daruk } from '../typings/daruk';
import { isJsTsFile, isSubClass, JsTsReg, uRequire } from '../utils';
import BaseContext from './base_context';

const join = path.join;
const isFn = is.fn;

/**
 * @desc daruk loader 类
 */
class DarukLoader {
  public app: Daruk.DarukCore;

  public constructor(app: Daruk.DarukCore) {
    this.app = app;
  }
  /**
   * @desc 加载项目配置
   */
  public loadConfig(path: string) {
    this.loadModuleSimple('config', path);
  }
  /**
   * @desc 加载 daruk 配置
   */
  public loadDarukConfig(path: string) {
    // 在 ts 的 dev 环境，文件名是 daruk.config.ts
    if (!fs.existsSync(path + '.js') && !fs.existsSync(path + '.ts')) return;
    const mod = uRequire(path);
    assert(isFn(mod), `DarukConfig must export a function, ${path}`);
    const DarukConfig = mod(this.app);
    // daruk config 支持的配置类型
    const validConfigKey = ['util', 'timer', 'middleware', 'middlewareOrder', 'globalModule'];
    validConfigKey.forEach((key) => {
      if (!DarukConfig[key]) return;
      // 特殊处理 middleware
      if (key === 'middleware') {
        this.loadDarukConfigMid(DarukConfig[key]);
        return;
      }
      // 特殊处理 middlewareOrder
      if (key === 'middlewareOrder') {
        this.app.setArrayModule('middlewareOrder', DarukConfig[key]);
        return;
      }
      this.app.mergeModule(key, DarukConfig[key]);
    });
  }
  /**
   * @desc 加载 util
   */
  public loadUtil(path: string) {
    this.loadModuleSimple('util', path);
  }
  /**
   * @desc 加载 timer
   */
  public loadTimer(path: string) {
    const timer = this.loadModule('timer', path);
    this.app.mergeModule('timer', timer);
  }
  /**
   * @desc 加载 glue
   */
  public loadGlue(path: string) {
    const glue = this.loadModule('glue', path);
    this.app.mergeModule('glue', glue);
  }
  /**
   * @desc 加载 service
   */
  public loadService(path: string) {
    const service = this.loadClassModule('service', path, true);
    this.app.mergeModule('service', service);
  }
  /**
   * @desc 加载 controller
   * controller 的目录结构也是路由 path 的一部分
   */
  public loadController(path: string) {
    // 以路由的 path 作为 key 保存 controller
    const routePath2ControllerMap: any = {};
    let routers = this.getFilePathRecursive(path);
    routers
      .map((router: string) => normalize(router))
      .forEach((file: string) => {
        let controller = uRequire(file);
        assert(
          isSubClass(controller, BaseContext),
          `[controller must export a subclass of Daruk.BaseController in path: ${file}`
        );
        let RoutePath = file.replace(normalize(path), '').replace(JsTsReg, '');
        // 验证类名必须是首字母大写的驼峰形式，并且和路由 path 匹配
        const validClassName = RoutePath
          // 斜线后面的字母大写, RoutePath 定会有 / 开头
          .replace(/\/([a-z])/g, (matches: string, capture: string) => {
            return capture.toLocaleUpperCase();
          })
          // 去除所有斜线
          .replace(/\//g, '');
        assert(
          validClassName === controller.name,
          `controller class name should be '${validClassName}' ( CamelCase style and match route path ) in path: ${file}`
        );

        // 认为 index 文件名对应的路由是 /
        RoutePath = RoutePath.replace(/\/index$/g, '/');
        routePath2ControllerMap[RoutePath] = controller;
      });
    this.app.mergeModule('controller', routePath2ControllerMap);
  }
  /**
   * @desc 加载中间件
   */
  public loadMiddleware(path: string) {
    const middleware = this.loadModule('middleware', path);
    this.app.mergeModule('middleware', middleware);
  }
  /**
   * @desc 加载 daurk.config 配置的中间件
   */
  private loadDarukConfigMid(midConfig: any) {
    const middleware: any = {};
    Object.keys(midConfig).forEach((key: string) => {
      const config = midConfig[key];
      let midName = key;
      let midExport;
      let packetName;
      // 如果中间件的配置是一个对象
      if (is.object(config)) {
        packetName = config.packet;
        midExport = config.export;
      } else {
        // 否则，值为一个函数，函数返回 middleware 内容
        packetName = key;
        midExport = config;
      }
      let packet;
      try {
        packet = require(packetName);
        // 有些包导出 export default function
        if (typeof packet !== 'function' && typeof packet.default === 'function') {
          packet = packet.default;
        }
      } catch (e) {
        throw new Error(`[daruk.config.middleware] require ${packetName} failed -  ${e.message}`);
      }
      assert(isFn(packet), `[daruk.config.middleware] can not find function at packet: ${packet}.`);
      assert(isFn(midExport), `[daruk.config.middleware] ${key} must be (or export) a function`);
      middleware[midName] = midExport(packet);
    });
    this.app.mergeModule('middleware', middleware);
  }
  /**
   * @desc 只是加载约定目录中的 index 文件并执行
   * 将返回值保存到 daruk
   * 比如 src/utils、src/config
   */
  private loadModuleSimple(type: string, path: string) {
    // 这里 load 的是文件夹，所以可以直接判断路径是否存在
    if (!fs.existsSync(path)) return;
    const mod = uRequire(path);
    assert(isFn(mod), `${type} must export a function in path: ${path}`);
    this.app.mergeModule(type, mod(this.app));
  }
  /**
   * @desc 获取约定目下第一级目录的文件名和 path
   */
  private getModuleDesc(modulePath: string) {
    const descriptions: Array<{ name: string; path: string }> = [];
    if (fs.existsSync(modulePath)) {
      const files = fs.readdirSync(modulePath);
      files.forEach((val: string) => {
        const fullPath = join(modulePath, val);
        const isFile = fs.lstatSync(fullPath).isFile();
        // 只加载 js 文件和 文件夹（文件夹内需要有 index.js）
        if ((isFile && isJsTsFile(fullPath)) || !isFile) {
          descriptions.push({
            name: isFile ? val.replace(JsTsReg, '') : val,
            path: fullPath
          });
        }
      });
    }
    return descriptions;
  }
  /**
   * @desc 加载约定目录下的第一级目录的内容
   * 并将模块返回的内容保存到 daruk
   * 比如 src/glues、src/middlewares
   */
  private loadModule(type: string, path: string) {
    const descriptions = this.getModuleDesc(path);
    const modules: any = {};
    descriptions.forEach((desc) => {
      const { name, path } = desc;
      const mod = uRequire(path);
      assert(isFn(mod), `[${type}] must export a function in path in path: ${path}`);
      if (name === 'index') {
        // index 只需要执行，不需要挂载
        mod(this.app);
      } else {
        modules[name] = mod(this.app);
      }
    });
    return modules;
  }
  /**
   * @desc 加载导出类型为 class 的模块
   * 比如 src/services
   */
  private loadClassModule(key: string, path: string, autoExecuteIndex?: boolean) {
    const descriptions = this.getModuleDesc(path);
    const modules: any = {};
    descriptions.forEach((desc) => {
      const { name, path } = desc;
      const classModule = uRequire(path);
      // 是否自执行 index 文件
      if (name === 'index' && autoExecuteIndex) {
        assert(isFn(classModule), `[${key}] must export a function, ${path}`);
        // index 认为是自执行文件
        classModule(this.app);
      } else {
        assert(
          isSubClass(classModule, BaseContext),
          `[${key}] must export a subclass of Daruk.Base${key.charAt(0).toUpperCase() +
            key.slice(1)} in path: ${path}`
        );
        modules[name] = classModule;
      }
    });
    return modules;
  }
  /**
   * @desc 递归加载多级目录的模块
   */
  private getFilePathRecursive(startPath: string) {
    let result: Array<string> = [];
    if (fs.existsSync(startPath)) {
      finder(startPath);
    }
    function finder(path: string) {
      let files = fs.readdirSync(path);
      files.forEach((val: string) => {
        let fPath = join(path, val);
        let stats = fs.statSync(fPath);
        if (stats.isDirectory()) finder(fPath);
        if (stats.isFile() && isJsTsFile(val)) result.push(fPath);
      });
    }
    return result;
  }
}

export default DarukLoader;
