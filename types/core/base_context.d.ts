import { Context } from '../typings/daruk';
import Daruk from './daruk';
export default class BaseContext {
    ctx: Context;
    app: Daruk;
    module: Daruk['module'];
    constructor(ctx: Context, daruk: Daruk);
}
