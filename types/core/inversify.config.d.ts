import { Container } from 'inversify';
import { PartialOptions } from "../daruk_options";
import Daruk from './daruk';
declare const darukContainer: Container;
declare let lazyInject: (serviceIdentifier: string | symbol | import("inversify/dts/interfaces/interfaces").interfaces.Newable<any> | import("inversify/dts/interfaces/interfaces").interfaces.Abstract<any>) => (proto: any, key: string) => void;
declare const DarukServer: (options?: PartialOptions) => Daruk;
export { darukContainer, lazyInject, DarukServer };
