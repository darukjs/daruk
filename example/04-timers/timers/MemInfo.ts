import { freemem } from 'os';
import { CronJob, Daruk, injectable, timer, TimerClass } from '../../../src';

@injectable()
@timer()
class MyTimer implements TimerClass {
  public cronTime!: string;
  public initTimer(daruk: Daruk) {
    this.cronTime = '* * * * * *';
  }
  public onTick(job: CronJob, daruk: Daruk) {
    // if you setup with pm2 cluster:
    // https://pm2.io/doc/en/runtime/guide/load-balancing/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding#cluster-environment-variable
    // only run tick on NODE_APP_INSTANCE === '0';
    if (!process.env.NODE_APP_INSTANCE || process.env.NODE_APP_INSTANCE === '0') {
      const unit = 1024;
      let freeMem = Math.round(freemem() / (unit * unit));
      daruk.logger.info({
        freeMem
      });
    }
  }
  public onComplete(job: CronJob, daruk: Daruk) {
    // if you setup with pm2 cluster:
    // https://pm2.io/doc/en/runtime/guide/load-balancing/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding#cluster-environment-variable
    // use the NODE_APP_INSTANCE to stop the task
    if (!process.env.NODE_APP_INSTANCE && process.env.NODE_APP_INSTANCE !== '0') {
      job.stop();
    }
  }
}
