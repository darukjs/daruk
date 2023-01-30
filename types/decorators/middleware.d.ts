import { Constructor, MiddlewareConfig, MiddlewareConfigOptions } from '../typings/daruk';
export declare function defineMiddleware(middlewareName: string): (target: Constructor) => void;
export declare function middleware(middleware: string | MiddlewareConfig[], options?: MiddlewareConfigOptions): (target: Object | Constructor, propertyKey?: string | undefined, descriptor?: PropertyDescriptor | undefined) => void;
