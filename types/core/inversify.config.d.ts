import { Container } from 'inversify';
import { PartialOptions } from '../typings/daruk_options';
import Daruk from './daruk';
declare const darukContainer: Container;
declare const DarukServer: (options?: PartialOptions) => Daruk;
export { darukContainer, DarukServer };
