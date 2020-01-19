import { injectable, interfaces } from 'inversify';
import { provide } from 'inversify-binding-decorators';
// tslint:disable-next-line
import 'reflect-metadata';
import Daruk from './core/daruk';
import { darukContainer, lazyInject as inject } from './core/inversify.config';
import { TYPES } from './core/types';
export * from './decorators';
const server = darukContainer.get<Daruk>(TYPES.Daruk);
export { server, darukContainer, inject, provide, injectable, interfaces, Daruk, TYPES };
