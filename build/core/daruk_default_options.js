"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function getDefaultOptions(rootPath, name, debug) {
    return {
        alertAccounts: [],
        rootPath,
        routerPath: path_1.join(rootPath, 'routers'),
        servicePath: path_1.join(rootPath, 'services'),
        gluePath: path_1.join(rootPath, 'glues'),
        timerPath: path_1.join(rootPath, 'timers'),
        middlewarePath: path_1.join(rootPath, 'middlewares'),
        controllerPath: path_1.join(rootPath, 'controllers'),
        utilPath: path_1.join(rootPath, 'utils'),
        darukConfigPath: path_1.join(rootPath, 'daruk.config'),
        configPath: path_1.join(rootPath, 'config'),
        debug,
        monitor: {
            enable: false,
            v8AnalyticsPath: '',
            v8ProfilerPath: '',
            auth: {
                name: '',
                password: ''
            }
        },
        gracefulShutdown: {
            enable: false,
            timeout: 10 * 1000
        },
        loggerOptions: {
            level: debug ? 'info' : 'silly',
            customLevels: {
                access: 2
            },
            transports: {
                file: false,
                console: true
            },
            overwriteConsole: !debug,
            logExt: {
                logType: name
            },
            fileInfo: debug,
            prettyLog: debug,
            disable: false,
            notStringifyLevles: [
                'access'
            ]
        },
        customLogger: null,
        loggerMiddleware: {},
        requestId: {
            inject: true
        },
        nodemailer: {
            debug,
            host: 'smtp.sina.com',
            secureConnection: true,
            auth: {
                user: 'fedvip',
                pass: '1234qwerasdfzxcv'
            },
            domain: 'sina.com'
        }
    };
}
exports.default = getDefaultOptions;
//# sourceMappingURL=daruk_default_options.js.map