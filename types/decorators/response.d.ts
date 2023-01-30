export declare function prefix(path: string): (target: Function) => void;
export declare function disabled(): (proto: Object, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
export declare function redirect(path: string): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function type(type: string): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function header(key: string | {
    [key: string]: string;
}, value?: string): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function cache(callback: (cacheKey: string, shouldCacheData?: any) => Promise<string>): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
