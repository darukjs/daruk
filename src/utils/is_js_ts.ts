export const JsTsReg = /\.js$|\.ts$/;
/**
 * @desc 判断是否是 js 或 ts 文件
 */
export function isJsTsFile(filename: string) {
  return JsTsReg.test(filename);
}
