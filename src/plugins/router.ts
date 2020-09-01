/**
 * @author xiaojue
 * @date 2020-01-15
 * @fileoverview 重构router部分,使用依赖控制controller
 */
import Router = require('@koa/router');
import assert = require('assert');
import { injectable } from 'inversify';
import is = require('is');
import Koa = require('koa');
import urljoin = require('url-join');
import Daruk from '../core/daruk';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { plugin } from '../decorators';
import {
  CONTROLLER_CLASS_PREFIX,
  CONTROLLER_DISABLED_CLASS,
  CONTROLLER_DISABLED_METHOD,
  CONTROLLER_FUNC_NAME,
  CONTROLLER_PATH,
  CONTROLLER_PRIORITY,
  CONTROLLER_REDIRECT_PATH,
  MIDDLEWARE_NAME
} from '../decorators/constants';
import { Constructor, MiddlewareClass, PluginClass } from '../typings/daruk';

interface DarukRouter extends Daruk {
  router: Router;
}

interface Meta {
  method: string;
  path: string;
}

@plugin()
@injectable()
class RouterController implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    daruk.on('init', () => {
      daruk.emit('routerUseBefore');

      daruk.router = new Router();

      if (darukContainer.isBound(TYPES.ControllerClass)) {
        const controllers = darukContainer.getAll<Constructor>(TYPES.ControllerClass);

        controllers
          .sort((a: Constructor, b: Constructor) => {
            let Apriority = Reflect.getMetadata(CONTROLLER_PRIORITY, a) || 0;
            let Bpriority = Reflect.getMetadata(CONTROLLER_PRIORITY, b) || 0;
            return Apriority - Bpriority;
          })
          .forEach((controller: Constructor) => {
            // 获取是否整个类被disabled
            const classDisabled =
              Reflect.getMetadata(CONTROLLER_DISABLED_CLASS, controller) === 'disabled';
            if (!classDisabled) {
              // 获取类中定义了路由的方法名
              let routeFuncs = Reflect.getMetadata(CONTROLLER_FUNC_NAME, controller) || [];
              // 去重复router
              routeFuncs = [...new Set(routeFuncs)];
              // 保存装饰器提供的路由信息
              const prefix = Reflect.getMetadata(CONTROLLER_CLASS_PREFIX, controller) || '';
              routeFuncs.forEach(function defineRoute(funcName: string) {
                // 获取方法是否被disable
                const methodDisabled =
                  Reflect.getMetadata(CONTROLLER_DISABLED_METHOD, controller, funcName) ===
                  'disabled';
                if (!methodDisabled) {
                  let metaRouters = Reflect.getMetadata(CONTROLLER_PATH, controller, funcName);
                  metaRouters.forEach(function defineMethdRoute(meta: Meta) {
                    const { method, path } = meta;
                    // 重定向信息
                    const redirectPath =
                      Reflect.getMetadata(CONTROLLER_REDIRECT_PATH, controller, funcName) || '';
                    // 避免解析出的路由没有 / 前缀
                    // 并保证前后都有 /，方便后续比对路由 key
                    // 不转path，因为可能会把通配符转成unix path
                    const routePath = urljoin('/', prefix, path).replace(/\/\//g, '/');
                    // 获取针对路由的中间件名字
                    const middlewares: Array<{
                      middlewareName: string;
                      options: { [key: string]: any };
                    }> = Reflect.getMetadata(MIDDLEWARE_NAME, controller, funcName);
                    // 是否使用了中间件装饰器
                    if (middlewares) {
                      // 可以对单个路由应用多个中间件
                      middlewares.forEach(({ middlewareName, options }) => {
                        let mid = darukContainer.getNamed<MiddlewareClass>(
                          TYPES.Middleware,
                          middlewareName
                        );
                        let middleware = mid.initMiddleware(daruk);
                        if (options) {
                          // @ts-ignore
                          middleware = middleware(options);
                        }
                        assert(
                          is.fn(middleware),
                          `[middleware] ${middlewareName} is not found or not a function`
                        );
                        // @ts-ignore
                        daruk.router.use(routePath, middleware);
                      });
                    }

                    // 初始化路由
                    daruk.prettyLog(`${method} - ${routePath}`, { type: 'router', init: true });
                    // @ts-ignore
                    daruk.router[method](routePath, async function routeHandle(
                      ctx: Koa['context'],
                      next: () => Promise<void>
                    ) {
                      let instance = new controller();
                      await instance[funcName](ctx, next);
                      // 允许用户在 controller 销毁前执行清理逻辑
                      if (is.fn(instance._destroy)) {
                        instance._destroy();
                      }
                      instance = null;
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
      }

      // @ts-ignore
      daruk.app.use(daruk.router.routes(), 'router');
      // @ts-ignore
      daruk.app.use(daruk.router.allowedMethods(), 'allowedMethods');
    });
  }
}
