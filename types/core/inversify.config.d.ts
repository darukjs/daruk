import { Container } from 'inversify';
import Daruk from './daruk';
declare const darukContainer: Container;
declare let lazyInject: (serviceIdentifier: string | symbol | import("inversify/dts/interfaces/interfaces").interfaces.Newable<any> | import("inversify/dts/interfaces/interfaces").interfaces.Abstract<any>) => (proto: any, key: string) => void;
declare const DarukServer: () => Daruk;
export { darukContainer, lazyInject, DarukServer };
