import { ParseType } from '../typings/daruk';
export declare function required(config: {
    body?: string[];
    query?: string[];
    params?: string[];
}): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function typeParse(config: {
    body?: ParseType;
    query?: ParseType;
    params?: ParseType;
}): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
