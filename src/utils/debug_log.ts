import chalk from 'chalk';

const COLOR_TYPE: {
  [key: string]: {
    r: number,
    g: number,
    b: number
  }
} = {
  'warn': {
    r: 225,
    g: 250,
    b: 120
  },
  'error': {
    r: 238,
    g: 119,
    b: 109
  },
  'log': {
    r: 38,
    g: 209,
    b: 237
  }
};

/**
 * @desc 高亮 console 输出
 */
export function debugLog(msg: string, type = 'log') {
  // tslint:disable-next-line:no-magic-numbers
  const { r = 38, g = 209, b = 237 } = COLOR_TYPE[type];
  console.log(chalk.rgb(r, g, b)(msg));
}
