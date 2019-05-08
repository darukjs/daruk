/**
 * @fileOverview 输出日志时，过滤内置模块
 */

import fs = require('fs');
import path = require('path');
import { isJsTsFile, JsTsReg } from './is_js_ts';

/**
 * @desc 获取内置模块名
 * @param {string} path - 模块路径
 * @return Array<string> - 内置模块名字
 */
function getBuiltInModuleNames(path: string) {
  return fs
    .readdirSync(path)
    .filter((file) => isJsTsFile(file))
    .map((file) => file.replace(JsTsReg, ''));
}
// 定义内置模块的名字，用于在输出日志时的过滤
const builtInModuleMap: any = {
  middleware: getBuiltInModuleNames(path.join(__dirname, '../built_in/middlewares')),
  glue: getBuiltInModuleNames(path.join(__dirname, '../built_in/glues'))
};

/**
 * @desc 输出日志时，过滤内置模块的信息
 */
export function filterBuiltInModule(type: string, moduleKeys: string[]) {
  if (!builtInModuleMap[type]) return moduleKeys;
  return moduleKeys.filter((key: string) => {
    return builtInModuleMap[type].indexOf(key) === -1;
  });
}
