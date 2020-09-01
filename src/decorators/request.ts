import assert = require('assert');
import htmlspecialchars = require('htmlspecialchars');
import is = require('is');
import koa = require('koa');
import { method, ParseType, validateFunc } from '../typings/daruk';

export function validate(method: method, key: string, validateFunc: validateFunc) {
  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function validateWrap(ctx: koa.Context, next: Function) {
      const checkObject = method === 'body' ? ctx.request.body : ctx[method];
      const value = checkObject[key];
      if (value) {
        ctx.validateError = ctx.validateError || [];
        const ret = validateFunc(value);
        if (is.string(ret)) ctx.validateError.push(ret);
      }
      await oldFunc(ctx, next);
      await next();
    };
  };
}

export function required(config: { body?: string[]; query?: string[]; params?: string[] }) {
  assert(
    is.object(config) && Object.keys(config).length > 0,
    `[Decorator required] parameter must be a object and more than one property`
  );
  function check(actual: { [key: string]: string }, expected: string[] | undefined, part: method) {
    if (is.object(actual) && expected) {
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

  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function verify(ctx: koa.Context, next: Function) {
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

export function typeParse(config: { body?: ParseType; query?: ParseType; params?: ParseType }) {
  function parse(constructors: ParseType | undefined, actual: { [key: string]: string }) {
    const parsed: { [key: string]: any } = {};
    if (constructors) {
      Object.keys(constructors).forEach((key) => {
        if (!actual[key]) {
          return;
        }
        const constructor = constructors[key];
        switch (constructor) {
          case Boolean:
          case String:
          case Number:
            parsed[key] = constructor(htmlspecialchars(actual[key]));
            break;
          case Object:
          case Array:
            try {
              parsed[key] = JSON.parse(actual[key]);
            } catch (e) {
              if (constructor === Object) {
                parsed[key] = {};
              } else {
                parsed[key] = Array(actual[key]);
              }
            }
            break;
        }
      });
    }
    return parsed;
  }

  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function parseWrap(ctx: koa.Context, next: Function) {
      ctx.parseBody = parse(config.body, ctx.request.body);
      ctx.parseQuery = parse(config.query, ctx.query);
      ctx.parseParams = parse(config.params, ctx.params);
      await oldFunc(ctx, next);
      await next();
    };
  };
}
