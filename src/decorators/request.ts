import assert = require('assert');
import is = require('is');
import BaseContext from '../core/base_context';
import { Daruk } from '../typings/daruk';

export function required(config: { body?: string[]; query?: string[]; params?: string[] }) {
  assert(
    is.object(config) && Object.keys(config).length > 0,
    `[Decorator required] parameter must be a object and more than one property`
  );
  function check(
    actual: { [key: string]: string },
    expected: string[],
    part: 'body' | 'query' | 'params'
  ) {
    if (is.object(actual)) {
      for (let key of expected) {
        if (is.undefined(actual[key])) {
          return {
            part,
            key
          };
        }
      }
    }
  }

  return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function verify(ctx: Daruk.Context, next: Function) {
      const { body } = ctx.request;
      const { query, params } = ctx;
      ctx.validateRequired =
        check(body, config.body, 'body') ||
        check(query, config.query, 'query') ||
        check(params, config.params, 'params');
      await oldFunc(ctx, next);
      await next();
    };
  };
}

export function typeParse(config: {
  body?: { [key: string]: Function };
  query?: { [key: string]: Function };
  params?: { [key: string]: Function };
}) {
  function parse(constructors: { [key: string]: any }, actual: { [key: string]: string }): any {
    // if (is.not.object(actual)) return actual;
    const parsed: { [key: string]: any } = {};
    Object.keys(constructors).forEach(key => {
      const constructor = constructors[key];
      parsed[key] = constructor(actual[key]);
    });
    return {
      ...actual,
      ...parsed
    };
  }

  return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function parseWrap(ctx: Daruk.Context, next: Function) {
      ctx.request.body = parse(config.body, ctx.request.body);
      ctx.query = parse(config.query, ctx.query);
      ctx.params = parse(config.params, ctx.params);
      await oldFunc(ctx, next);
      await next();
    };
  };
}
