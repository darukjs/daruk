import { Daruk } from 'daruk-rpc';
// import logger from './libs/logger';

const prod = process.env.NODE_ENV !== 'dev';

const options = {
  rootPath: __dirname,
  debug: !prod,
  loggerOptions: {
    overwriteConsole: false
  },
  customLogger: prod ? console : null,
  rpcOptions: {
    serverConfig: {

    },
    // @ts-ignore
    middlewareOrder: []
  }
  // customLogger: prod ? logger : null
};

export default new Daruk('xxxx', options);
