import BaseContext from '../core/base_context';
import { method, ParseType, validateFunc } from '../typings/daruk';
export declare function validate(method: method, key: string, validateFunc: validateFunc): (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function required(config: {
    body?: string[];
    query?: string[];
    params?: string[];
}): (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function typeParse(config: {
    body?: ParseType;
    query?: ParseType;
    params?: ParseType;
}): (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => void;
