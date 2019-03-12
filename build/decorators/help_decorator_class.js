"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelpDecoratorClass {
    init(app) {
        this.app = app;
    }
    getModule(moduleName) {
        return this.app[moduleName];
    }
}
exports.default = new HelpDecoratorClass();
//# sourceMappingURL=help_decorator_class.js.map