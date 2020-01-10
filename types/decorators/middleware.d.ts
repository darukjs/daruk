import 'reflect-metadata';
import BaseContext from '../core/base_context';
export declare function middleware(middlewareName: string, options?: any): (target: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => void;
