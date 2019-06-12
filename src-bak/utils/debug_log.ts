import chalk from 'chalk';

const warnR = 225;
const warnG = 250;
const warnB = 120;
const errorR = 238;
const errorG = 119;
const errorB = 109;
const logR = 38;
const logG = 209;
const logB = 237;

/**
 * @desc 高亮 console 输出
 */
export function debugLog(msg: string, type = 'info') {
  switch (type) {
    case 'warn':
      console.log(chalk.rgb(warnR, warnG, warnB)(msg));
      break;
    case 'error':
      console.log(chalk.rgb(errorR, errorG, errorB)(msg));
      break;
    default:
      console.log(chalk.rgb(logR, logG, logB)(msg));
      break;
  }
}
