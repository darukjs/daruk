import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import { Container, decorate, injectable, interfaces } from 'inversify';
import Koa = require('koa');
// tslint:disable-next-line
import 'reflect-metadata';
import Daruk from './daruk';
import Loader from './loader';
import { TYPES } from './types';

const darukContainer = new Container();

decorate(injectable(), Koa);
decorate(injectable(), EventEmitter);
decorate(injectable(), KoaLogger.logger);

darukContainer.bind<interfaces.Newable<Koa>>(TYPES.Koa).toConstructor<Koa>(Koa);
darukContainer
  .bind<interfaces.Newable<KoaLogger.logger>>(TYPES.KoaLogger)
  .toConstructor<KoaLogger.logger>(KoaLogger.logger);
darukContainer.bind<Loader>(TYPES.Loader).to(Loader);
darukContainer.bind<Daruk>(TYPES.Daruk).to(Daruk);

export { darukContainer };
