import { DarukServer } from '../../src';

(async () => {
  let app = DarukServer();
  app.initOptions({
    rootPath: __dirname
  });

  await app.loadFile('./timers');
  await app.initPlugin();
})();
