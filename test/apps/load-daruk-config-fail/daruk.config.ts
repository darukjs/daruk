import path = require('path');
import { Daruk } from '../../../src/typings/daruk';

const mockNodeModulesPacket = path.resolve(__dirname, './node_modules/mock-middleware/index.js');

export default function(daruk: Daruk.DarukCore) {
  return {
    globalModule: {
      module1: () => {}
    },
    middlewareOrder: [mockNodeModulesPacket, 'configMid'],
    middleware: {
      [mockNodeModulesPacket]() {
        throw new Error('code should throw error before executed here');
      },
      configMid: {
        packet: mockNodeModulesPacket,
        export(mid: Function) {
          return mid('configMid');
        }
      }
    },
    timer: {
      testTimer: {
        cronTime: '* * * * * *',
        onTick: function onTick(this: any) {
          this.stop();
        },
        onComplete: function onComplete() {
          // @ts-ignore
          daruk.timerComplete = true;
        }
      }
    },
    util: {
      util1: () => {}
    }
  };
}
