import assert = require('assert');
import { injectable } from 'inversify';
import is = require('is');
import { normalize } from 'upath';
import { getFilePathRecursive, uRequire } from '../utils';

const isFn = is.fn;

@injectable()
export default class Loader {
  /**
   * @desc 加载 controller
   * controller 的目录结构也是路由 path 的一部分
   */
  public loadFile(path: string) {
    // 以路由的 path 作为 key 保存 controller
    let routers = getFilePathRecursive(path);
    routers
      .map((router: string) => normalize(router))
      .forEach((file: string) => {
        uRequire(file);
      });
  }
}
