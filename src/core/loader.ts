import assert = require('assert');
import fs = require('fs');
import { injectable } from 'inversify';
import is = require('is');
import path = require('path');
import { normalize } from 'upath';
import { getFilePathRecursive, isJsTsFile, isSubClass, JsTsReg, uRequire } from '../utils';

const join = path.join;
const isFn = is.fn;

@injectable()
export default class Loader {
  /**
   * @desc 加载 controller
   * controller 的目录结构也是路由 path 的一部分
   */
  public loadController(path: string) {
    // 以路由的 path 作为 key 保存 controller
    const routePath2ControllerMap: any = {};
    let routers = getFilePathRecursive(path);
    routers
      .map((router: string) => normalize(router))
      .forEach((file: string) => {
        let controller = uRequire(file);
        let RoutePath = file.replace(normalize(path), '').replace(JsTsReg, '');
        // 验证类名必须是首字母大写的驼峰形式，并且和路由 path 匹配
        const validClassName = RoutePath
          // 斜线后面的字母大写, RoutePath 定会有 / 开头
          .replace(/\/([a-z])/g, (matches: string, capture: string) => {
            return capture.toLocaleUpperCase();
          })
          // 去除所有斜线
          .replace(/\//g, '');
        assert(
          validClassName === controller.name,
          `controller class name should be '${validClassName}' ( CamelCase style and match route path ) in path: ${file}`
        );

        // 认为 index 文件名对应的路由是 /
        RoutePath = RoutePath.replace(/\/index$/g, '/');
        routePath2ControllerMap[RoutePath] = controller;
      });
    return routePath2ControllerMap;
  }
  public loadModule(type: string, path: string) {
    const descriptions = this.getModuleDesc(path);
    const modules: any = {};
    descriptions.forEach((desc) => {
      const { name, path } = desc;
      const mod = uRequire(path);
      assert(isFn(mod), `[${type}] must export a function in path in path: ${path}`);
      modules[name] = mod;
    });
    return modules;
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
  /**
   * @desc 获取约定目下第一级目录的文件名和 path
   */
  private getModuleDesc(modulePath: string) {
    const descriptions: Array<{ name: string; path: string }> = [];
    if (fs.existsSync(modulePath)) {
      const files = fs.readdirSync(modulePath);
      files.forEach((val: string) => {
        const fullPath = join(modulePath, val);
        const isFile = fs.lstatSync(fullPath).isFile();
        // 只加载 js 文件和 文件夹（文件夹内需要有 index.js）
        if ((isFile && isJsTsFile(fullPath)) || !isFile) {
          descriptions.push({
            name: isFile ? val.replace(JsTsReg, '') : val,
            path: fullPath
          });
        }
      });
    }
    return descriptions;
  }
}
