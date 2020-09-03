import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { PartialOptions } from '../../types/daruk_options';
import Daruk from './daruk';

const darukContainer = new Container({
  skipBaseClassChecks: true
});
let { lazyInject } = getDecorators(darukContainer);

const DarukServer = (options?: PartialOptions) => {
  let instance = new Daruk();
  instance._initOptions(options);
  return instance;
};

export { darukContainer, lazyInject, DarukServer };
