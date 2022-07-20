import { DarukContext, Next } from '../../src';
export declare class MiddlewaresDecorator {
    get(ctx: DarukContext, next: Next): Promise<any>;
    post(ctx: DarukContext, next: Next): Promise<any>;
    put(ctx: DarukContext, next: Next): Promise<any>;
}
