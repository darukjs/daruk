import { Constructor } from '../typings/daruk';
export declare function controller(): (target: Constructor<any>) => void;
export declare function priority(priority: number): (target: Constructor<any>) => void;
