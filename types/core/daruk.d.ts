/// <reference types="node" />
import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import Http = require('http');
import Https = require('https');
import Koa = require('koa');
import { Options, PartialOptions } from '../../types/daruk_options';
import Loader from './loader';
declare class Daruk extends EventEmitter {
    [key: string]: any;
    name: string;
    app: Koa;
    httpServer: Http.Server | Https.Server;
    logger: KoaLogger.logger;
    options: Options;
    loader: Loader;
    initOptions(options?: PartialOptions): void;
    loadFile(path: string): Promise<void>;
    initPlugin(): Promise<void>;
    mockContext(req?: {}): Koa.ParameterizedContext<any, {}>;
    listen(...args: any[]): Promise<Http.Server>;
    prettyLog(msg: string, ext?: {
        type?: string;
        level?: string;
        init?: boolean;
    }): void;
}
export default Daruk;
