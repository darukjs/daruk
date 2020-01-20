import { Constructor } from '../typings/daruk';
export declare function middleware(middlewareName: string, options?: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function defineMiddlware(middlewareName: string): (target: Constructor<any>) => void;
