/// <reference types="node" />
import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import { Options } from '../../types/daruk_options';
export default class Module extends EventEmitter {
    options: Options;
    logger: KoaLogger.logger;
    module: {
        [key: string]: any;
    };
    mergeModule(type: string, mergeObj: {
        [key: string]: any;
    }): void;
    prettyLog(msg: string, ext?: {
        type?: string;
        level?: string;
        init?: boolean;
    }): void;
    logModuleMsg(type: string, moduleObj: any): void;
    setModule<T>(type: string, key: string, value: any): void;
    setArrayModule(type: string, arr: []): void;
}
