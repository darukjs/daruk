import { Constructor, MiddlewareConfig, MiddlewareConfigOptions } from '../typings/daruk';
interface MiddlewareAndOptions extends Array<string | object> {
    [index: number]: string | object;
    0: MiddlewareConfig['middlewareName'];
    1: MiddlewareConfigOptions;
}
export declare function middlewares(...middlewares: Array<string | MiddlewareAndOptions>): (target: Object | Constructor, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
export {};
