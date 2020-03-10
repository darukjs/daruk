import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import Daruk from './daruk';

const darukContainer = new Container();
let { lazyInject } = getDecorators(darukContainer);

const DarukServer = () => {
  return new Daruk();
};

export { darukContainer, lazyInject, DarukServer };
