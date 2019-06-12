declare module 'cron' {
  export class CronJob {
    public constructor(
      cronTime: Date | string,
      onTick: Function,
      onComplete: Function,
      start: boolean,
      timezone: string,
      context: CronJob,
      runOninit: Function
    );
  }
}
