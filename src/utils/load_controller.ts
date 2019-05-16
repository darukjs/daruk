import assert = require("assert");
import { BaseController } from "daruk";
import fs = require("fs");
import path = require("path");
import { normalize } from "upath";
import { isJsTsFile, isSubClass, JsTsReg, uRequire } from "./common_utils";

const join = path.join;

function getFilePathRecursive(startPath: string) {
  let result: Array<string> = [];
  if (fs.existsSync(startPath)) {
    finder(startPath);
  }
  function finder(path: string) {
    let files = fs.readdirSync(path);
    files.forEach((val: string) => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile() && isJsTsFile(val)) result.push(fPath);
    });
  }
  return result;
}

export default function loadController(path: string) {
  // 以路由的 path 作为 key 保存 controller
  const routePath2ControllerMap: any = {};
  let routers = getFilePathRecursive(path);
  routers
    .map((router: string) => normalize(router))
    .forEach((file: string) => {
      let controller = uRequire(file);
      assert(
        isSubClass(controller, BaseController),
        `[controller must export a subclass of Daruk.BaseController in path: ${file}`
      );
      let RoutePath = file.replace(normalize(path), "").replace(JsTsReg, "");

      // 验证类名必须是首字母大写的驼峰形式，并且和路由 path 匹配
      const validClassName = RoutePath
        // 首字母大写
        .replace(/(^[a-z])/, (matches: string, capture: string) => {
          return capture.toLocaleUpperCase();
        })
        // 斜线后面的字母大写
        .replace(/\/([a-z])/g, (matches: string, capture: string) => {
          return capture.toLocaleUpperCase();
        })
        // 去除所有斜线
        .replace(/\//g, "");
      assert(
        validClassName === controller.name,
        `controller class name should be '${validClassName}' ( CamelCase style and match route path ) in path: ${file}`
      );

      // 认为 index 文件名对应的路由是 /
      RoutePath = RoutePath.replace(/\/index$/g, "/");
      routePath2ControllerMap[RoutePath] = controller;
    });
  return routePath2ControllerMap;
}
