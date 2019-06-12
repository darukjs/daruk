import assert = require('assert');
import is = require('is');
import Koa = require('koa');
import Router = require('koa-router');
import path = require('path');
import { join as ujoin } from 'upath';
import urljoin = require('url-join');
import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';
// tslint:disable-next-line
import 'reflect-metadata';
import {
  CONTROLLER_CLASS_PREFIX,
  CONTROLLER_DISABLED_CLASS,
  CONTROLLER_DISABLED_METHOD,
  CONTROLLER_FUNC_NAME,
  CONTROLLER_PATH,
  CONTROLLER_REDIRECT_PATH,
  MIDDLEWARE_NAME
} from '../decorators/constants';
import { filterBuiltInModule } from '../utils';

const join = path.join;
const isFn = is.fn;

interface DarukRouter extends Daruk {
  router: Router;
}

plugins.add('darukRouter', ['wrapMiddlewareUse'], (daruk: DarukRouter) => {
  daruk.router = new Router();
  const middlewares = loader.loadModule('middleware', join(__dirname, '../built_in/middlewares'));
  daruk.mergeModule('middleware', middlewares);
  daruk.emit('middlewareLoaded', daruk);

  const middlewareOrder = daruk.module.middlewareOrder || [];

  middlewareOrder.unshift('daruk_request_id', 'daruk_logger', 'daruk_body');

  // 再次保存 middlewareOrder，使外部对最终的 middlewareOrder 可见
  daruk.module.middlewareOrder = middlewareOrder;
  middlewareOrder.forEach(function useMiddleware(name: string) {
    const middleware = daruk.module.middleware[name];
    assert(is.undefined(middleware) === false, `[middleware] ${name} is not found`);
    // 有些中间件是直接修改 koa 实例，不会返回一个函数
    // 因此只 use 函数类型的中间件
    if (isFn(middleware)) {
      daruk.httpServer.use(middleware(daruk), name);
    }
  });
  daruk.prettyLog(JSON.stringify(filterBuiltInModule('middleware', middlewareOrder)), {
    type: 'middleware',
    init: true
  });
  // controller 初始化
  const routers = loader.loadController(daruk.options.controllerPath);
  daruk.mergeModule('controller', routers);
  daruk.emit('controllerLoaded', daruk);
  const controllers = daruk.module.controller;
  // 用于验证是否定义了重复路由
  const routeMap: { [key: string]: Array<string> } = {};
  // controllers 对象的 key 就是路由 path 的前缀
  Object.keys(controllers).forEach(function handleControllers(prefixPath: string) {
    const ControllerClass = controllers[prefixPath];
    // 获取是否整个类被disabled
    const classDisabled =
      Reflect.getMetadata(CONTROLLER_DISABLED_CLASS, ControllerClass) === 'disabled';
    if (!classDisabled) {
      // 获取类中定义了路由的方法名
      let routeFuncs = Reflect.getMetadata(CONTROLLER_FUNC_NAME, ControllerClass) || [];
      // 去重复router
      routeFuncs = [...new Set(routeFuncs)];
      // 保存装饰器提供的路由信息
      const prefix = Reflect.getMetadata(CONTROLLER_CLASS_PREFIX, ControllerClass) || '';
      routeFuncs.forEach(function defineRoute(funcName: string) {
        // 获取方法是否被disable
        const methodDisabled =
          Reflect.getMetadata(CONTROLLER_DISABLED_METHOD, ControllerClass, funcName) === 'disabled';
        if (!methodDisabled) {
          // 获取装饰器注入的路由信息
          let metaRouters = Reflect.getMetadata(CONTROLLER_PATH, ControllerClass, funcName);
          metaRouters.forEach(function defineMethdRoute(meta: { [key: string]: string }) {
            const { method, path } = meta;
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
            const middlewares: Array<any> = Reflect.getMetadata(
              MIDDLEWARE_NAME,
              ControllerClass,
              funcName
            );
            // 是否使用了中间件装饰器
            if (middlewares) {
              // 可以对单个路由应用多个中间件
              middlewares.forEach(({ middlewareName, options }) => {
                let modules = daruk.module;
                let middleware: any;
                if (
                  modules.globalMiddleware &&
                  modules.globalMiddleware[middlewareName] &&
                  options
                ) {
                  middleware = modules.globalMiddleware[middlewareName](options);
                } else if (modules.globalMiddleware && !options) {
                  middleware = modules.middleware[middlewareName];
                } else if (options) {
                  middleware = modules.middleware[middlewareName](options);
                } else {
                  middleware = modules.middleware[middlewareName];
                }
                assert(
                  isFn(middleware),
                  `[middleware] ${middlewareName} is not found or not a function`
                );
                daruk.router.use(routePath, middleware);
              });
            }

            // 初始化路由
            daruk.prettyLog(`${method} - ${routePath}`, { type: 'router', init: true });
            // @ts-ignore
            daruk.router[method](routePath, async function routeHandle(
              ctx: Koa['context'],
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
        }
      });
    }
  });

  daruk.httpServer.use(daruk.router.routes(), 'router');
  daruk.httpServer.use(daruk.router.allowedMethods(), 'allowedMethods');
});
