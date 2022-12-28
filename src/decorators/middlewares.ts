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
      defineFunMeta(
        target.constructor as Constructor,
        propertyKey,
        getMiddlewaresConfig(middlewares)
      );
    } else {
      // target为被装饰类 (即constructor函数)
      defineControllerMeta(target as Constructor, getMiddlewaresConfig(middlewares));
    }
  };
}

function getMiddlewaresConfig(middlewares: Array<string | MiddlewareAndOptions>) {
  const result: MiddlewareConfig[] = [];
  for (let item of middlewares) {
    if (Array.isArray(item)) {
      const [middlewareName, options] = item as MiddlewareAndOptions;
      result.push({ middlewareName, options });
    } else if (typeof item === 'string') {
      const middlewareName = item;
      result.push({ middlewareName });
    }
  }
  return result;
}

function defineFunMeta(
  TargetClass: Constructor,
  propertyKey: string,
  configList: MiddlewareConfig[]
) {
  let middlewareList: MiddlewareConfig[] =
    Reflect.getMetadata(MIDDLEWARE_NAME, TargetClass, propertyKey) || [];

  // 反向连接数组 使@middlewares书写顺序和中间件真实顺序保持一致
  middlewareList = configList.concat(middlewareList);

  Reflect.defineMetadata(MIDDLEWARE_NAME, middlewareList, TargetClass, propertyKey);
}

function defineControllerMeta(TargetClass: Constructor, configList: MiddlewareConfig[]) {
  let middlewareList: MiddlewareConfig[] =
    Reflect.getMetadata(CONTROLLER_MIDDLEWARES, TargetClass) || [];

  // 反向连接数组 使@middlewares书写顺序和中间件真实顺序保持一致
  middlewareList = configList.concat(middlewareList);

  Reflect.defineMetadata(CONTROLLER_MIDDLEWARES, middlewareList, TargetClass);
}
