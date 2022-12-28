/// <reference types="node" />
import http = require('http');
export default function mockHttp(req?: Object): {
    request: any;
    response: http.ServerResponse;
};
