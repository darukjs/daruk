/**
 * @fileOverview daurk 初始化约定目录的模块
 */

import assert = require('assert');
import { CronJob as cronJob } from 'cron';
import is = require('is');
import path = require('path');
// tslint:disable-next-line
import 'reflect-metadata';
import { join as ujoin } from 'upath';
import urljoin = require('url-join');
import { Options } from '../../types/daruk_options';
import {
  CONTROLLER_CLASS_PREFIX,
  CONTROLLER_FUNC_NAME,
  CONTROLLER_PATH,
  CONTROLLER_REDIRECT_PATH,
  MIDDLEWARE_NAME
} from '../decorators/constants';
import { Daruk } from '../typings/daruk';
import { filterBuiltInModule } from '../utils';
import Events from './daruk_event';
import DarukLoader from './daruk_loader';

const join = path.join;
const isFn = is.fn;

/**
 * @desc 初始化约定目录模块
 * 该类最终会混入 DarukCore
 */
export default class DarukInitModule {
  public options: Options;
  public module: any;
  public config: any;
  public globalModule: any;
  public util: any;
  public glue: any;
  public context: Daruk.Context;
  public router: any;
  public prettyLog: (msg: string, ext?: { type?: string; level?: string; init?: boolean }) => void;
  public emit: (event: string, data?: any) => void;
  public use: (middleware: Function, name: string) => void;
  /**
   * @desc 初始化路由，中间件，服务，工具函数等
   */
  public initEnv() {
    const { options } = this;
    // @ts-ignore
    const loader = new DarukLoader(this);

    loader.loadConfig(options.configPath);
    Events.emit('configLoaded', this);
    this.initConfig();

    loader.loadDarukConfig(options.darukConfigPath);
    Events.emit('darukConfigLoaded', this);
    this.initGlobalModule();

    loader.loadUtil(options.utilPath);
    Events.emit('utilLoaded', this);
    this.initUtil();

    loader.loadGlue(options.gluePath);
    // 加载内置插件
    loader.loadGlue(join(__dirname, '../built_in/glues'));
    Events.emit('glueLoaded', this);
    this.initGlue();

    loader.loadService(options.servicePath);
    this.emit('serviceLoaded', this);
    this.initService();

    loader.loadMiddleware(options.middlewarePath);
    // 加载内置中间件
    loader.loadMiddleware(join(__dirname, '../built_in/middlewares'));
    Events.emit('middlewareLoaded', this);
    this.initMiddleware();

    loader.loadController(options.controllerPath);
    Events.emit('controllerLoaded', this);

    this.initRouter();

    loader.loadTimer(options.timerPath);
    Events.emit('timerLoaded', this);
    this.initTimer();
  }
  /**
   * @desc 挂载 config 到 daruk 和 ctx
   */
  private initConfig() {
    this.config = this.context.config = this.module.config;
    this.prettyLog('', { type: 'config', init: true });
  }
  /**
   * @desc 挂载 config 到 daruk 和 ctx
   */
  private initGlobalModule() {
    this.globalModule = this.context.globalModule = this.module.globalModule;
    this.logModuleMsg('globalModule', this.globalModule);
  }
  /**
   * @desc 挂载 util 到 daruk 和 ctx
   */
  private initUtil() {
    this.util = this.context.util = this.module.util;
    this.logModuleMsg('util', this.util);
  }
  /**
   * @desc 挂载 glue 到 daruk 和 ctx
   */
  private initGlue() {
    this.glue = this.context.glue = this.module.glue;
    this.logModuleMsg('glue', this.glue);
  }

  /**
   * @desc service 在 HelpContextClass 中生效，不需要初始化
   * 仅打印日志
   */
  private initService() {
    this.logModuleMsg('service', this.module.services);
  }

  /**
   * @desc 初始化中间件
   */
  private initMiddleware() {
    const middlewareOrder = this.module.middlewareOrder || [];
    // 是否开启了 v8 分析功能
    if (this.options.monitor.enable) {
      middlewareOrder.unshift('daruk_monitor');
    }
    middlewareOrder.unshift('daruk_request_id', 'daruk_logger', 'daruk_context_loader');

    // 再次保存 middlewareOrder，使外部对最终的 middlewareOrder 可见
    this.module.middlewareOrder = middlewareOrder;
    // tslint:disable-next-line
    const self = this;
    middlewareOrder.forEach(function useMiddleware(name: string) {
      const middleware = self.module.middleware[name];
      assert(is.undefined(middleware) === false, `[middleware] ${name} is not found`);
      // 有些中间件是直接修改 koa 实例，不会返回一个函数
      // 因此只 use 函数类型的中间件
      if (isFn(middleware)) {
        self.use(middleware, name);
      }
    });
    this.prettyLog(JSON.stringify(filterBuiltInModule('middleware', middlewareOrder)), {
      type: 'middleware',
      init: true
    });
  }
  /**
   * @desc 过滤无用日志的输出
   */
  private logModuleMsg(type: string, moduleObj: any) {
    if (!moduleObj) return;
    const keys = filterBuiltInModule(type, Object.keys(moduleObj));
    if (keys.length > 0) {
      this.prettyLog(JSON.stringify(keys), { type, init: true });
    }
  }
  /**
   * @desc 初始化路由
   */
  private initRouter() {
    const controllers = this.module.controller;
    // 用于验证是否定义了重复路由
    const routeMap: { [key: string]: Array<string> } = {};
    // tslint:disable-next-line
    const self = this;
    // controllers 对象的 key 就是路由 path 的前缀
    Object.keys(controllers).forEach(function handleControllers(prefixPath: string) {
      const ControllerClass = controllers[prefixPath];
      // 获取类中定义了路由的方法名
      const routeFuncs = Reflect.getMetadata(CONTROLLER_FUNC_NAME, ControllerClass) || [];
      // 保存装饰器提供的路由信息
      const prefix = Reflect.getMetadata(CONTROLLER_CLASS_PREFIX, ControllerClass) || '';
      routeFuncs.forEach(function defineRoute(funcName: string) {
        // 获取装饰器注入的路由信息
        const { method, path } = Reflect.getMetadata(CONTROLLER_PATH, ControllerClass, funcName);
        // 重定向信息
        const redirectPath =
          Reflect.getMetadata(CONTROLLER_REDIRECT_PATH, ControllerClass, funcName) || '';
        // 避免解析出的路由没有 / 前缀
        // 并保证前后都有 /，方便后续比对路由 key
        // 不转path，因为可能会把通配符转成unix path
        const routePath = urljoin('/', prefix, ujoin(prefixPath), path).replace(/\/\//g, '/');
        // 将路由按照 http method 分组
        routeMap[method] = routeMap[method] || [];
        // 判断路由是否重复定义
        assert(
          routeMap[method].indexOf(routePath) === -1,
          `[router] duplicate routing definition in ${
            ControllerClass.name
          }.${funcName}: ${routePath}`
        );
        // 保存路由 path
        routeMap[method].push(routePath);

        // 绑定针对单个路由的中间件
        // 获取针对路由的中间件名字
        const middlewareNames: Array<string> = Reflect.getMetadata(
          MIDDLEWARE_NAME,
          ControllerClass,
          funcName
        );
        // 是否使用了中间件装饰器
        if (middlewareNames) {
          // 可以对单个路由应用多个中间件
          middlewareNames.forEach((name) => {
            const middleware = self.module.middleware[name];
            assert(isFn(middleware), `[middleware] ${name} is not found or not a function`);
            self.router.use(routePath, middleware);
          });
        }

        // 初始化路由
        self.prettyLog(`${method} - ${routePath}`, { type: 'router', init: true });
        self.router[method](routePath, async function routeHandle(
          ctx: Daruk.Context,
          next: () => Promise<void>
        ): Promise<any> {
          let controllerInstance = new ControllerClass(ctx);
          await controllerInstance[funcName](ctx, next);
          // 允许用户在 controller 销毁前执行清理逻辑
          if (isFn(controllerInstance._destroy)) {
            controllerInstance._destroy();
          }
          controllerInstance = null;
          // 增加重定向：
          if (redirectPath) {
            ctx.redirect(redirectPath);
          }
        });
      });
    });

    this.use(this.router.routes(), 'router');
    this.use(this.router.allowedMethods(), 'allowedMethods');
  }
  /**
   * @desc 初始化定时器
   */
  private initTimer() {
    let timer = this.module.timer || {};
    const defaultJob = {
      start: true,
      // https://www.zeitverschiebung.net/cn/all-time-zones.html
      timeZone: 'Asia/Shanghai'
    };
    Object.keys(timer).forEach(function initTimer(jobName: string) {
      let job = timer[jobName];
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
  }
}
