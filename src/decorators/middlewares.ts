import { Constructor, MiddlewareConfig, MiddlewareConfigOptions } from '../typings/daruk';
import { CONTROLLER_MIDDLEWARES, MIDDLEWARE_NAME } from './constants';

interface MiddlewareAndOptions extends Array<string | object> {
  [index: number]: string | object;
  0: MiddlewareConfig['middlewareName'];
  1: MiddlewareConfigOptions;
}

/**
 * @desc middlewares 中间件装饰器
 * @param ...middlewares 中间件的名字 或MiddlewareConfig对象
 * @returns MethodDecorator & ClassDecorator - 装饰器
 */
export function middlewares(...middlewares: Array<string | MiddlewareAndOptions>) {
  return (target: Object | Constructor, propertyKey?: string, descriptor?: PropertyDescriptor) => {
    // 判断装饰对象是函数还是类
    if (propertyKey && descriptor) {
      // target为被装饰类的 prototype
      defineFunMeta(target.constructor as Constructor, propertyKey, middlewares);
    } else {
      // target为被装饰类 (即constructor函数)
      defineControllerMeta(target as Constructor, middlewares);
    }
  };
}

function defineFunMeta(
  TargetClass: Constructor,
  propertyKey: string,
  middlewares: Array<string | MiddlewareAndOptions>
) {
  let middlewareList: MiddlewareConfig[] =
    Reflect.getMetadata(MIDDLEWARE_NAME, TargetClass, propertyKey) || [];

  forMiddlewares(middlewares, (middlewareConfig) => middlewareList.push(middlewareConfig));

  Reflect.defineMetadata(MIDDLEWARE_NAME, middlewareList, TargetClass, propertyKey);
}

function defineControllerMeta(
  TargetClass: Constructor,
  middlewares: Array<string | MiddlewareAndOptions>
) {
  let middlewareList: MiddlewareConfig[] =
    Reflect.getMetadata(CONTROLLER_MIDDLEWARES, TargetClass) || [];

  forMiddlewares(middlewares, (middlewareConfig) => middlewareList.push(middlewareConfig));

  Reflect.defineMetadata(CONTROLLER_MIDDLEWARES, middlewareList, TargetClass);
}

function forMiddlewares(
  middlewares: Array<string | MiddlewareAndOptions>,
  callback: (middlewareConfig: MiddlewareConfig) => unknown
) {
  for (let item of middlewares) {
    if (Array.isArray(item)) {
      let [middlewareName, options] = item as MiddlewareAndOptions;
      callback({ middlewareName, options });
    } else if (typeof item === 'string') {
      let middlewareName = item;
      callback({ middlewareName });
    }
  }
}
