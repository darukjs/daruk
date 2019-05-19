import {
  all,
  BaseController,
  cache,
  del,
  disabled,
  get,
  head,
  header,
  JSON,
  json,
  middleware,
  options,
  patch,
  post,
  put,
  redirect,
  required,
  type,
  typeParse,
  validate
} from '../../../../src';
import { Daruk } from '../../../../src/typings/daruk';

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

export default class Index extends BaseController {
  @get('/repeatMethod')
  @post('/repeatMethod')
  public async repeatMethod(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @all('/all')
  public async all(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @del('/del')
  public async del(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @get('/get')
  public async get(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @head('/head')
  public async head(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @options('/options')
  public async options(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @patch('/patch')
  public async patch(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @post('/post')
  public async post(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @put('/put')
  public async put(ctx: Daruk.Context, next: Function) {
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
  public redirect(ctx: Daruk.Context) {
    ctx.body = '';
  }
  @type('application/json')
  @get('/type')
  public type(ctx: Daruk.Context) {
    ctx.body = {
      foo: 1
    };
  }

  @header('foo', 'bar')
  @get('/header')
  public header(ctx: Daruk.Context) {
    ctx.body = 'bar';
  }

  @header({ foo: 'bar' })
  @get('/headers')
  public headers(ctx: Daruk.Context) {
    ctx.body = 'bar';
  }

  @get('/wildcard_(\\d)_(\\d).htm')
  public deatil(ctx: Daruk.Context) {
    ctx.body = {
      foo: 1
    };
  }

  @middleware('routeMiddleware')
  @get('/middleware')
  public async middleware(ctx: Daruk.Context, next: Function) {}

  @middleware('multiRouteMiddleware', { foo: 1 })
  @middleware('routeMiddleware')
  @get('/multiMiddleware')
  public async multiMiddleware(ctx: Daruk.Context, next: Function) {}

  @required({
    body: ['foo'],
    query: ['bar'],
    params: ['id']
  })
  @post('/required/:id')
  public async required(ctx: Daruk.Context, next: Function) {
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
  public typeParse(ctx: Daruk.Context) {
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
  public validate(ctx: Daruk.Context) {
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
  public validatePost(ctx: Daruk.Context) {
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
  public cache(ctx: Daruk.Context) {
    ctx.body = 'cacheData';
  }

  @disabled()
  @get('/disabled')
  public disabled(ctx: Daruk.Context) {
    ctx.body = '';
  }
}
