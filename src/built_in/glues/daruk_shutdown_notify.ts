/**
 * @fileOverview 宕机、重启通知插件
 */

import assert = require('assert');
import os = require('os');
import { Daruk } from '../../typings/daruk';
import { parallelWithNoBreak } from '../../utils';

const noop = () => {};

export default function(app: Daruk.DarukCore) {
  // 如果没有配置邮箱服务
  if (!app.options.nodemailer) return noop;
  return function shutDownNotify() {
    let alertAccounts = app.options.alertAccounts;
    assert(
      alertAccounts && alertAccounts.length > 0,
      'daruk.options.alertAccounts with email address required'
    );
    app.exitHook.addHook(function handleShutdownNotify(err: Error, cb: Function) {
      // 为了避免频繁的邮件通知，只有报错重启时，才做通知
      if (!err) return cb();
      doNotify(err, app).then(() => {
        cb();
      });
    });
  };
}

function doNotify(err: Error, app: Daruk.DarukCore) {
  const tos = app.options.alertAccounts;
  const reason = (err && (err.stack || err.message)) || 'no error message';
  return new Promise((resolve) => {
    if (!app.options.debug) {
      const subject = `${app.name}`;
      const msg = `${
        app.name
      } server is shutdown in ${os.hostname()} at ${new Date().toLocaleString()} - ${reason}`;

      const { daruk_nodemailer } = app.glue;
      const mailOptions = daruk_nodemailer.options;
      const from = `${mailOptions.auth.user}@${mailOptions.domain}`;

      const tasks = [
        function sendMailAlert(cb: Function) {
          app.prettyLog('sending mail', { type: 'mail' });
          daruk_nodemailer.sendMail(
            {
              from,
              to: tos.join(','),
              subject,
              text: msg
            },
            (err: any, info: any) => {
              if (err) {
                app.prettyLog(err.stack || err.message || err, { level: 'error', type: 'mail' });
              } else {
                app.prettyLog('mail has been sent', { type: 'mail' });
              }
              cb();
            }
          );
        }
      ];
      parallelWithNoBreak(
        tasks,
        () => {
          resolve();
        },
        app
      );
    } else {
      resolve();
    }
  });
}
