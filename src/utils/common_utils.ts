/**
 * @desc 同时支持导入 es6 模块和 common.js 模块
 */
export function uRequire(path: string) {
  const module = require(path);
  return module.__esModule && module.default ? module.default : module;
}

export const JsTsReg = /\.js$|\.ts$/;
/**
 * @desc 判断是否是 js 或 ts 文件
 */
export function isJsTsFile(filename: string) {
  return JsTsReg.test(filename);
}

/**
 * @desc 判断 subClass 是否是 superClass 的子类
 */
export function isSubClass(subClass: any, superClass: any) {
  return superClass.isPrototypeOf(subClass);
}