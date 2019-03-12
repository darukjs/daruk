"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_context_class_1 = require("../../core/help_context_class");
function default_1() {
    return async function DarukContextLoader(ctx, next) {
        ctx.service = new help_context_class_1.default(ctx);
        await next();
        ctx.service._destroy();
    };
}
exports.default = default_1;
//# sourceMappingURL=daruk_context_loader.js.map