/**
 * @fileOverview 邮件插件
 */

import { Daruk } from '../../typings/daruk';

import { createTransport } from 'nodemailer';

export default function(app: Daruk.DarukCore) {
  const mail = createTransport(app.options.nodemailer);
  mail.verify(function handleMailVerificationResult(err: any, success: any) {
    if (err) {
      app.prettyLog(err.message, { level: 'error', type: 'mail' });
    } else {
      app.prettyLog('nodemailer is connected', { type: 'mail' });
    }
  });
  return mail;
}
