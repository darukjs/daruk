import { Daruk } from '../../../../src/';

export default function(daruk: Daruk) {
  daruk.registerTimer({
    name: 'testTimer',
    export: {
      cronTime: '* * * * * *',
      onTick: function onTick(this: any) {
        this.stop();
      },
      onComplete: function onComplete() {
        // @ts-ignore
        daruk.timerComplete = true;
      }
    }
  });
}
