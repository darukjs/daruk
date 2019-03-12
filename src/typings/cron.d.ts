declare module 'cron' {
  export class CronJob {
    public constructor(
      cronTime: Date | string,
      onTick: Function,
      onComplete: Function,
      start: Function,
      timezone: string,
      context: CronJob,
      runOninit: Function
    );
  }
}
