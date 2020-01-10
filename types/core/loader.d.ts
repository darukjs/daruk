declare class Loader {
    loadController(path: string): any;
    loadModule(type: string, path: string): any;
    loadDarukConfigMid(midConfig: any): {
        middleware: any;
        globalMiddleware: any;
    };
    private getModuleDesc;
}
declare const _default: Loader;
export default _default;
