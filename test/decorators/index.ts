import {
  all,
  cache,
  controller,
  defineMiddlware,
  del,
  disabled,
  get,
  head,
  header,
  injectable,
  JSON,
  json,
  middleware,
  options,
  patch,
  post,
  prefix,
  put,
  redirect,
  required,
  type,
  typeParse,
  validate
} from '../../src';

class Store {
  public store: any;
  public constructor() {
    this.store = {};
  }
  public get(key: string) {
    if (this.store[key] && Date.now() - this.store[key].createTime > this.store[key].timeout) {
      delete this.store[key];
    }
    return this.store[key];
  }
  public set(key: string, value: string, timeout: number) {
    this.store[key] = {
      value,
      createTime: Date.now(),
      timeout
    };
  }
}

const cacheStore = new Store();

@defineMiddlware('multiRouteMiddleware')
@injectable()
class MultiRouteMiddlewareRouteMiddleware {
  public initMiddleware() {
    return (options: any) => {
      return (ctx: any, next: Function) => {
        ctx.body = ctx.body + ' multiRouteMiddleware';
        return next();
      };
    };
  }
}

@defineMiddlware('routeMiddleware')
@injectable()
class RouteMiddleware {
  public initMiddleware() {
    return (ctx: any, next: Function) => {
      ctx.body = 'routeMiddleware';
      return next();
    };
  }
}

@injectable()
@controller()
class Index {
  @get('/repeatMethod')
  @post('/repeatMethod')
  public async repeatMethod(ctx: any, next: Function) {
    ctx.body = '';
  }
  @all('/all')
  public async all(ctx: any, next: Function) {
    ctx.body = '';
  }
  @del('/del')
  public async del(ctx: any, next: Function) {
    ctx.body = '';
  }
  @get('/get')
  public async get(ctx: any, next: Function) {
    ctx.body = '';
  }
  @head('/head')
  public async head(ctx: any, next: Function) {
    ctx.body = '';
  }
  @options('/options')
  public async options(ctx: any, next: Function) {
    ctx.body = '';
  }
  @patch('/patch')
  public async patch(ctx: any, next: Function) {
    ctx.body = '';
  }
  @post('/post')
  public async post(ctx: any, next: Function) {
    ctx.body = '';
  }
  @put('/put')
  public async put(ctx: any, next: Function) {
    ctx.body = '';
  }
  @json()
  @get('/json1')
  public json() {
    return { foo: 1 };
  }
  @get('/json2')
  @JSON()
  public JSON() {
    return { foo: 1 };
  }
  @redirect('/json2')
  @get('/redirect')
  public redirect(ctx: any) {
    ctx.body = '';
  }
  @type('application/json')
  @get('/type')
  public type(ctx: any) {
    ctx.body = {
      foo: 1
    };
  }

  @header('foo', 'bar')
  @get('/header')
  public header(ctx: any) {
    ctx.body = 'bar';
  }

  @header({ foo: 'bar' })
  @get('/headers')
  public headers(ctx: any) {
    ctx.body = 'bar';
  }

  @get('/wildcard_(\\d)_(\\d).htm')
  public deatil(ctx: any) {
    ctx.body = {
      foo: 1
    };
  }

  @middleware('routeMiddleware')
  @get('/middleware')
  public async middleware(ctx: any, next: Function) {}

  @middleware('multiRouteMiddleware', { foo: 1 })
  @middleware('routeMiddleware')
  @get('/multiMiddleware')
  public async multiMiddleware(ctx: any, next: Function) {}

  @required({
    body: ['foo'],
    query: ['bar'],
    params: ['id']
  })
  @post('/required/:id')
  public async required(ctx: any, next: Function) {
    ctx.body = ctx.validateRequired || '';
  }

  @typeParse({
    body: {
      foo: Boolean,
      bar: String,
      arr: Array,
      object: Object,
      arr2: Array,
      object2: Object
    },
    query: {
      bar: String,
      arr2: Array,
      object2: Object
    },
    params: {
      id: Number
    }
  })
  @post('/typeparse/:id')
  public typeParse(ctx: any) {
    ctx.body = {
      body: ctx.parseBody,
      params: ctx.parseParams,
      query: ctx.parseQuery
    };
  }

  @validate('query', 'foo', (value: string) => {
    if (value !== 'bar') {
      return 'foo not pass validate!';
    }
  })
  @get('/validate')
  public validate(ctx: any) {
    if (ctx.validateError.length) {
      ctx.body = ctx.validateError[0];
    } else {
      ctx.body = '';
    }
  }

  @validate('body', 'foo', (value: string) => {
    if (value !== 'bar') {
      return 'foo not pass validate!';
    }
  })
  @post('/validate')
  public validatePost(ctx: any) {
    if (ctx.validateError.length) {
      ctx.body = ctx.validateError[0];
    } else {
      ctx.body = '';
    }
  }

  @cache(async (cacheKey, data) => {
    if (data) {
      cacheStore.set(cacheKey, data, 1000);
      return data;
    } else {
      return cacheStore.get(cacheKey);
    }
  })
  @get('/cache')
  public cache(ctx: any) {
    ctx.body = 'cacheData';
  }

  @disabled()
  @get('/disabled')
  public disabled(ctx: any) {
    ctx.body = '';
  }
}

@prefix('/test/v1')
@injectable()
@controller()
class PrefixIndex {
  @get('/index')
  public async test(ctx: any, next: Function) {
    ctx.body = '';
  }
}

@prefix('/test/deep/v1')
@injectable()
@controller()
class PrefixTestDeep {
  @get('/json')
  public async json(ctx: any, next: Function) {
    ctx.body = { foo: 1 };
  }
}

@prefix('/disabled')
@disabled()
@injectable()
@controller()
class DisabledIndex {
  @get('/test')
  public async test(ctx: any, next: Function) {
    ctx.body = '';
  }
}
