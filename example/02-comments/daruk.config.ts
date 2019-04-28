import { Daruk } from 'daruk';
import { join } from 'path';

interface Middleware {
  [key: string]: (mid: Function) => any;
}
interface DarukConfig {
  middlewareOrder: string[];
  middleware: Middleware;
}

export default function(daruk: Daruk) {
  const globalConfig: DarukConfig = {
    middlewareOrder: ['koa-ejs', 'koa-favicon', 'koa-static', 'koa-bodyparser'],
    middleware: {
      'koa-favicon'(mid: Function) {
        return mid(`${daruk.options.rootPath}/public/favicon.png`);
      },
      // https://github.com/koajs/ejs
      'koa-ejs'(mid: Function) {
        mid(daruk, {
          root: join(daruk.options.rootPath, './view'),
          viewExt: 'tpl'
        });
        return false;
      },
      // https://github.com/koajs/static
      'koa-static'(mid: Function) {
        return mid(join(daruk.options.rootPath, './public'));
      },
      // https://github.com/koajs/bodyparser
      'koa-bodyparser'(mid: Function) {
        return mid();
      }
    }
  };
  return globalConfig;
}
