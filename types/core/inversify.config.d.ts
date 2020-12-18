import { Container } from 'inversify';
import Daruk from './daruk';
declare const darukContainer: Container;
declare let lazyInject: (serviceIdentifier: import("inversify/dts/interfaces/interfaces").interfaces.ServiceIdentifier<any>) => (proto: any, key: string) => void;
declare const DarukServer: (options?: import("../../types/daruk_options").RecursivePartial<import("../../types/daruk_options").Options> | undefined) => Daruk;
export { darukContainer, lazyInject, DarukServer };
