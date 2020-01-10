/// <reference types="node" />
import Http = require('http');
import Https = require('https');
import Koa = require('koa');
import { PartialOptions } from '../../types/daruk_options';
import Module from './module';
declare class Daruk extends Module {
    plugins: {
        [key: string]: any;
    };
    name: string;
    app: Koa;
    httpServer: Http.Server | Https.Server;
    constructor(name: string, options?: PartialOptions);
    mockContext(req?: {}): Koa.ParameterizedContext<any, {}>;
    listen(...args: any[]): Promise<Http.Server>;
    loadPlugin(paths?: string[]): Promise<void>;
    private plugin;
}
export default Daruk;
