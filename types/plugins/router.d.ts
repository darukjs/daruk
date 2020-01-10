import Router = require('koa-router');
import 'reflect-metadata';
import Daruk from '../core/daruk';
interface DarukRouter extends Daruk {
    router: Router;
}
declare const _default: (daruk: DarukRouter) => void;
export default _default;
