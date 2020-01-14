import Router = require('koa-router');
import Daruk from '../core/daruk';
interface DarukRouter extends Daruk {
    router: Router;
}
declare const _default: (daruk: DarukRouter) => Promise<void>;
export default _default;
