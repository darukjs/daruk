/**
 * @fileOverview 初始化timer
 */

import { CronJob as cronJob } from 'cron';
import ExitHook = require('daruk-exit-hook');
import { injectable } from 'inversify';
import Daruk from '../core/daruk';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { plugin } from '../decorators';
import { pluginClass, timerClass } from '../typings/daruk';

@plugin()
@injectable()
class Timer implements pluginClass {
  public async initPlugin(daruk: Daruk) {
    daruk.on('init', () => {
      if (darukContainer.isBound(TYPES.Timer)) {
        const defaultJob = {
          start: true,
          // https://www.zeitverschiebung.net/cn/all-time-zones.html
          timeZone: 'Asia/Shanghai'
        };
        const timer = darukContainer.getAll<timerClass>(TYPES.Timer);
        timer.forEach(function initTimer(job: timerClass) {
          job.initTimer(daruk);
          // tslint:disable-next-line:no-parameter-reassignment
          job = {
            ...defaultJob,
            ...job,
            onTick: job.onTick,
            onComplete: job.onComplete,
            runOnInit: job.runOnInit
          };
          // tslint:disable-next-line:no-unused-expression
          new cronJob(
            job.cronTime,
            job.onTick,
            job.onComplete,
            job.start,
            job.timeZone,
            job.context,
            job.runOnInit
          );
        });
      }
    });
  }
}
