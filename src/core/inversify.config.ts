import { EventEmitter } from 'events';
import { Container, decorate, injectable } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import Daruk from './daruk';
import Loader from './loader';
import { TYPES } from './types';

const darukContainer = new Container();
let { lazyInject } = getDecorators(darukContainer);

decorate(injectable(), EventEmitter);

darukContainer.bind<Loader>(TYPES.Loader).to(Loader);
darukContainer.bind<Daruk>(TYPES.Daruk).to(Daruk);

const DarukServer = () => {
  return darukContainer.get<Daruk>(TYPES.Daruk);
};

export { darukContainer, lazyInject, DarukServer };
