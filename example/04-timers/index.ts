import { DarukServer } from '../../src';

(async () => {
  let app = DarukServer();
  app.initOptions({
    rootPath: __dirname,
    debug: process.env.NODE_ENV === 'dev'
  });

  await app.loadFile('./timers');
  await app.initPlugin();
})();
