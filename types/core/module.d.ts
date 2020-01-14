import KoaLogger = require('daruk-logger');
export default class Module {
    logger: KoaLogger.logger;
    module: {
        [key: string]: any;
    };
    mergeModule(type: string, mergeObj: {
        [key: string]: any;
    }): void;
    setModule(type: string, key: string, value: any): void;
    setArrayModule(type: string, arr: []): void;
}
