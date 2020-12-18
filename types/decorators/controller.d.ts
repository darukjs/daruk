import { Constructor } from '../typings/daruk';
export declare function controller(middlewares?: [{
    middlewareName: string;
    options?: {
        [key: string]: any;
    };
}]): (target: Constructor) => void;
export declare function priority(priority: number): (target: Constructor) => void;
