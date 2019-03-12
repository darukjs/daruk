"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseContext {
    constructor(ctx) {
        this.ctx = ctx;
        this.app = ctx.app;
        this.service = ctx.service;
    }
}
exports.default = BaseContext;
//# sourceMappingURL=base_context.js.map