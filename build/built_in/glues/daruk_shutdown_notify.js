"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const os = require("os");
const utils_1 = require("../../utils");
function default_1(app) {
    let alertAccounts = app.options.alertAccounts;
    assert(alertAccounts && alertAccounts.length > 0, 'daruk.options.alertAccounts with email address required');
    return () => {
        app.exitHook.addHook(function handleShutdownNotify(err, cb) {
            if (!err)
                return cb();
            shutDownNotify(err, app).then(() => {
                cb();
            });
        });
    };
}
exports.default = default_1;
function shutDownNotify(err, app) {
    const tos = app.options.alertAccounts;
    const reason = (err && (err.stack || err.message)) || 'no error message';
    return new Promise((resolve) => {
        if (!app.options.debug) {
            const subject = `${app.name}`;
            const msg = `${app.name} server is shutdown in ${os.hostname()} at ${new Date().toLocaleString()} - ${reason}`;
            const { daruk_nodemailer, daruk_sina_watch } = app.glue;
            const mailOptions = daruk_nodemailer.options;
            const from = `${mailOptions.auth.user}@${mailOptions.domain}`;
            const tasks = [
                function sendMailAlert(cb) {
                    app.prettyLog('sending mail', { type: 'mail' });
                    daruk_nodemailer.sendMail({
                        from,
                        to: tos.join(','),
                        subject,
                        text: msg
                    }, (err, info) => {
                        if (err) {
                            app.prettyLog(err.stack || err.message || err, { level: 'error', type: 'mail' });
                        }
                        else {
                            app.prettyLog('mail has been sent', { type: 'mail' });
                        }
                        cb();
                    });
                }
            ];
            utils_1.parallelWithNoBreak(tasks, () => {
                resolve();
            }, app);
        }
        else {
            resolve();
        }
    });
}
//# sourceMappingURL=daruk_shutdown_notify.js.map