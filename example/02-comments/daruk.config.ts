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
    // middlewareOrder: ['koa-ejs', 'koa-favicon', 'koa-bodyparser'],
    middlewareOrder: ['koa-ejs', 'koa-favicon'],
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
      }
    }
  };
  return globalConfig;
}
