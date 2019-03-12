export default function(daruk: any) {
  return {
    cronTime: '* * * * * *',
    onTick: function onTick(this: any) {
      this.stop();
    },
    onComplete: function onComplete() {
      daruk.timerComplete = true;
    }
  };
}
