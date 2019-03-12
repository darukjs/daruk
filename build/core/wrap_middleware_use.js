"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertHrtime = require("convert-hrtime");
const daruk_event_1 = require("./daruk_event");
const midNames = [];
const WRAP_MIDDLEWARE_USE = Symbol('WRAP_MIDDLEWARE_USE');
function wrapUse(fn, name) {
    return async function wrappedUse(ctx, next) {
        enterMid(ctx);
        await fn(ctx, next);
        outMid(ctx);
    };
}
function enterMid(ctx) {
    let time = getTimeInfo(ctx);
    time.list.push(getHrTime());
}
function outMid(ctx) {
    let ns2ms = 1000000;
    let time = getTimeInfo(ctx);
    let start = time.list.pop();
    let diff = getHrTime() - start - time.prev;
    time.prev += diff;
    time.diff.unshift(diff);
    if (time.list.length === 0) {
        let data = {};
        let sum = 0;
        time.diff.forEach(function summeryTimeConsumption(diff, index) {
            sum += diff;
            let name = midNames[index];
            if (name === 'router') {
                name = `router:${ctx.request.url}`;
            }
            data[name] = diff / ns2ms;
        });
        data.sum = sum / ns2ms;
        ctx.middleware_perf = data;
        daruk_event_1.default.emit('access', ctx);
    }
}
function getTimeInfo(ctx) {
    let timeInfo = ctx[WRAP_MIDDLEWARE_USE];
    if (!timeInfo) {
        timeInfo = {
            prev: 0,
            list: [],
            diff: []
        };
        ctx[WRAP_MIDDLEWARE_USE] = timeInfo;
    }
    return timeInfo;
}
function getHrTime() {
    return convertHrtime(process.hrtime()).nanoseconds;
}
function wrapMiddleware(app) {
    const use = app.use;
    app.use = function wrappedKoaUse(fn, name) {
        midNames.push(name || 'index_' + midNames.length);
        return use.call(app, wrapUse(fn, name));
    };
}
exports.default = wrapMiddleware;
//# sourceMappingURL=wrap_middleware_use.js.map