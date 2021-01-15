import { Container } from 'inversify';
import { PartialOptions } from '../../types/daruk_options';
import Daruk from './daruk';

const darukContainer = new Container({
  skipBaseClassChecks: true
});

const DarukServer = (options?: PartialOptions) => {
  let instance = new Daruk();
  instance._initOptions(options);
  darukContainer.bind<Daruk>('Daruk').toConstantValue(instance);
  return instance;
};

export { darukContainer, DarukServer };
