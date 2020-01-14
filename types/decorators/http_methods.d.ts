import 'reflect-metadata';
export declare const post: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const get: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const del: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const put: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const patch: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const options: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const head: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const all: (path: string) => (proto: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
