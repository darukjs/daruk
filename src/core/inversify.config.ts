import { Container } from 'inversify';
import { PartialOptions } from '../../types/daruk_options';
import Daruk from './daruk';

const darukContainer = new Container({
  skipBaseClassChecks: true
});

const DarukServer = (options?: PartialOptions) => {
  let instance = new Daruk();
  instance._initOptions(options);
  return instance;
};

export { darukContainer, DarukServer };
