import path = require('path');
import { Daruk } from '../../../src/typings/daruk';

export default function(daruk: Daruk.DarukCore) {
  return {
    globalModule: {
      module1: () => {}
    },
    middlewareOrder: ['errorMid'],
    middleware: {
      errorMid: (mid: Function) => {
        return mid();
      }
    }
  };
}
