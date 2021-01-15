import { Container } from 'inversify';
import Daruk from './daruk';
declare const darukContainer: Container;
declare const DarukServer: (options?: import("../../types/daruk_options").RecursivePartial<import("../../types/daruk_options").Options> | undefined) => Daruk;
export { darukContainer, DarukServer };
