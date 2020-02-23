import { EventEmitter } from 'events';
import { Container, decorate, injectable } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import Daruk from './daruk';
import { TYPES } from './types';

const darukContainer = new Container();
let { lazyInject } = getDecorators(darukContainer);

const DarukServer = () => {
  return new Daruk();
};

export { darukContainer, lazyInject, DarukServer };
