// tslint:disable-next-line
import 'reflect-metadata';
import Daruk from './core/daruk';
import { darukContainer, lazyInject } from './core/inversify.config';
import { TYPES } from './core/types';

export * from './decorators';

const server = darukContainer.get<Daruk>(TYPES.Daruk);
// tslint:disable-next-line:no-var-requires
require('./plugins/timer');
// tslint:disable-next-line:no-var-requires
require('./plugins/daruk_http_server_shutdown');
// tslint:disable-next-line:no-var-requires
require('./plugins/exitHook');
// tslint:disable-next-line:no-var-requires
require('./plugins/wrapMiddlewareUse');
// tslint:disable-next-line:no-var-requires
require('./plugins/middleware');
// tslint:disable-next-line:no-var-requires
require('./plugins/router');

// tslint:disable-next-line:no-var-requires
require('./built_in/middlewares/daruk_request_id');
// tslint:disable-next-line:no-var-requires
require('./built_in/middlewares/daruk_body');
// tslint:disable-next-line:no-var-requires
require('./built_in/middlewares/daruk_logger');

(async () => {
  server.initOptions({
    gracefulShutdown: { enable: true },
    middwareOrder: ['daruk_logger', 'daruk_request_id', 'daruk_body']
  });
  await server.initPlugin();

  // tslint:disable-next-line
  server.listen(3000);
})();
