/**
 * @fileOverview 手动启动的定时器
 */

export default function(daruk: any) {
  return {
    start: false,
    cronTime: '* * * * * *',
    onTick: function onTick(this: any) {
      this.stop();
    },
    onComplete: function onComplete() {
      daruk.manualStartTimerComplete = true;
    }
  };
}
