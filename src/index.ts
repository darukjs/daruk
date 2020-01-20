// tslint:disable-next-line
import 'reflect-metadata';
export { injectable, interfaces } from 'inversify';
export { provide } from 'inversify-binding-decorators';
export { TYPES } from './core/types';
export { darukContainer, lazyInject as inject, server } from './core/inversify.config';
export * from './decorators';
import Daruk from './core/daruk';
export { Daruk };
