// tslint:disable-next-line
import 'reflect-metadata';
import Daruk from './core/daruk';
import { darukContainer, lazyInject } from './core/inversify.config';
import { TYPES } from './core/types';
export * from './decorators';

const server = darukContainer.get<Daruk>(TYPES.Daruk);

(async () => {
  server.initOptions({
    middwareOrder: ['daruk_logger', 'daruk_request_id', 'daruk_body']
  });
  await server.initPlugin();
  // tslint:disable-next-line
  server.listen(3000);
})();
