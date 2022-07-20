import { Container } from 'inversify';
import Daruk from './daruk';
declare const darukContainer: Container;
declare const DarukServer: (options?: import("../typings/daruk_options").RecursivePartial<import("../typings/daruk_options").Options> | undefined) => Daruk;
export { darukContainer, DarukServer };
