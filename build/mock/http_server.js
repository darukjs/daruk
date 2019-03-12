"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const deepAssign = require("object-assign-deep");
const mockRequest = {
    headers: {
        'x-forwarded-for': '127.0.0.1',
        host: '127.0.0.1',
        hostname: '127.0.0.1',
        'Content-Type': '',
        'Content-Length': 0
    },
    method: 'GET',
    url: '/',
    socket: {
        remoteAddress: '127.0.0.1',
        remotePort: 3000
    }
};
function mockHttp(req = {}) {
    const request = deepAssign({}, mockRequest, req);
    const response = new http.ServerResponse(request);
    return {
        request,
        response
    };
}
exports.default = mockHttp;
//# sourceMappingURL=http_server.js.map