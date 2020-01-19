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
  /**
   * @desc 加载 daurk.config 配置的中间件
   */
  public loadDarukConfigMid(midConfig: any) {
    const middleware: any = {};
    const globalMiddleware: any = {};
    Object.keys(midConfig).forEach((key: string) => {
      const config = midConfig[key];
      let midName = key;
      let midExport;
      let packetName;
      // 如果中间件的配置是一个对象
      if (is.object(config)) {
        packetName = config.packet;
        midExport = config.export;
      } else {
        // 否则，值为一个函数，函数返回 middleware 内容
        packetName = key;
        midExport = config;
      }
      let packet;
      try {
        packet = require(packetName);
        // 有些包导出 export default function
        if (typeof packet !== 'function' && typeof packet.default === 'function') {
          packet = packet.default;
        }
      } catch (e) {
        throw new Error(`[daruk.config.middleware] require ${packetName} failed -  ${e.message}`);
      }
      assert(isFn(packet), `[daruk.config.middleware] can not find function at packet: ${packet}.`);
      assert(isFn(midExport), `[daruk.config.middleware] ${key} must be (or export) a function`);
      middleware[midName] = midExport(packet);
      globalMiddleware[midName] = packet;
    });
    return {
      middleware,
      globalMiddleware
    };
  }
}
