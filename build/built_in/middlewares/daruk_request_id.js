"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koaRequestId = require("daruk-request-id");
exports.default = (app) => {
    return koaRequestId(app.options.requestId, app);
};
//# sourceMappingURL=daruk_request_id.js.map