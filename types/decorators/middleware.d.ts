import { Constructor } from '../typings/daruk';
export declare function middleware(middlewareName: string, options?: {
    [key: string]: any;
}): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function defineMiddleware(middlewareName: string): (target: Constructor<any>) => void;
