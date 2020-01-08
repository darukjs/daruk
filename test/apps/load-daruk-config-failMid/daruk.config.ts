import path = require('path');

export default function() {
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
