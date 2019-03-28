"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
function default_1(app) {
    if (!app.options.nodemailer)
        return null;
    const mail = nodemailer_1.createTransport(app.options.nodemailer);
    mail.verify(function handleMailVerificationResult(err, success) {
        if (err) {
            app.prettyLog(err.message, { level: 'error', type: 'mail' });
        }
        else {
            app.prettyLog('nodemailer is connected', { type: 'mail' });
        }
    });
    return mail;
}
exports.default = default_1;
//# sourceMappingURL=daruk_nodemailer.js.map