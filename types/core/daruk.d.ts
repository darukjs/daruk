/// <reference types="node" />
import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import Koa = require('koa');
import { ListenOptions } from 'net';
import { Options, PartialOptions } from '../../types/daruk_options';
import { Server } from '../typings/daruk';
declare class Daruk extends EventEmitter {
    [key: string]: any;
    name: string;
    app: Koa;
    httpServer: Server;
    logger: KoaLogger.logger;
    options: Options;
    constructor();
    initOptions(options?: PartialOptions): void;
    loadFile(path: string): Promise<void>;
    initPlugin(): Promise<void>;
    mockContext(req?: {}): Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, hostname?: string, listeningListener?: () => void): Server;
    listen(port: number, backlog?: number, listeningListener?: () => void): Server;
    listen(port: number, listeningListener?: () => void): Server;
    listen(path: string, backlog?: number, listeningListener?: () => void): Server;
    listen(path: string, listeningListener?: () => void): Server;
    listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
    listen(handle: any, listeningListener?: () => void): Server;
    listen(options: ListenOptions, listeningListener?: () => void): Server;
    prettyLog(msg: string, ext?: {
        type?: string;
        level?: string;
        init?: boolean;
    }): void;
    private _loadFile;
}
export default Daruk;
