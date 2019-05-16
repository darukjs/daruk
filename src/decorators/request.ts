import is = require("is");
import BaseContext from "../core/base_context";
import { Daruk } from "../typings/daruk";

export function required(config: {
  body?: string[],
  query?: string[],
  params?: string[],
  callback?: (unexpected: string, part: 'body' | 'query' | 'params') => any
}) {
  function check(actual: { [key: string]: string }, expected: string[], part: 'body' | 'query' | 'params') {
    expected.forEach(value => {
      if (!actual[value]) {
        if (config.callback) {
          config.callback(value, part);
        }
        // else { xxx }
        // todo: 添加自带提醒
      }
    });
  }

  return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function verify(ctx: Daruk.Context, next: Function) {
      const { body } = ctx.request;
      const { query, params } = ctx;
      if (is.object(body)) {
        check(body, config.body, 'body');
      }
      if (is.object(query)) {
        check(query, config.query, 'query');
      }
      if (is.object(params)) {
        check(params, config.params, 'params');
      }
      await oldFunc(ctx, next);
      await next();
    };
  };
}
