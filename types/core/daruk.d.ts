/// <reference types="node" />
import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import Http = require('http');
import Https = require('https');
import Koa = require('koa');
import { Options, PartialOptions } from '../../types/daruk_options';
import Loader from './loader';
declare class Daruk extends EventEmitter {
    plugins: {
        [key: string]: any;
    };
    name: string;
    app: Koa;
    httpServer: Http.Server | Https.Server;
    options: Options;
    logger: KoaLogger.logger;
    module: {
        [key: string]: any;
    };
    loader: Loader;
    private _koa;
    private _koaLogger;
    constructor();
    initOptions(options?: PartialOptions): void;
    mockContext(req?: {}): Koa.ParameterizedContext<any, {}>;
    listen(...args: any[]): Promise<Http.Server>;
    loadPlugin(paths?: string[]): Promise<void>;
    prettyLog(msg: string, ext?: {
        type?: string;
        level?: string;
        init?: boolean;
    }): void;
    logModuleMsg(type: string, moduleObj: any): void;
    mergeModule(type: string, mergeObj: {
        [key: string]: any;
    }): void;
    setModule(type: string, key: string, value: any): void;
    setArrayModule(type: string, arr: []): void;
    private plugin;
}
export default Daruk;
