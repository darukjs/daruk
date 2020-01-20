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
import { Cron, PluginClass, TimerClass } from '../typings/daruk';

@plugin()
@injectable()
class Timer implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    daruk.on('init', () => {
      if (darukContainer.isBound(TYPES.Timer)) {
        const timer = darukContainer.getAll<TimerClass>(TYPES.Timer);
        timer.forEach(function initTimer(job: TimerClass) {
          job.initTimer(daruk);
          let instance = new cronJob(
            job.cronTime,
            function() {
              job.onTick(this, daruk);
            },
            function() {
              job.onComplete(this, daruk);
            },
            job.start || true,
            job.timeZone || 'Asia/Shanghai',
            job.context,
            job.runOnInit || false
          ) as Cron;
        });
      }
    });
  }
}
