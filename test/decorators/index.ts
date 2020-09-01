import {
  all,
  cache,
  controller,
  CronJob,
  Daruk,
  DarukContext,
  defineMiddleware,
  del,
  disabled,
  get,
  head,
  header,
  injectable,
  JSON,
  json,
  middleware,
  Next,
  options,
  patch,
  post,
  prefix,
  priority,
  put,
  redirect,
  required,
  timer,
  type,
  typeParse,
  validate
} from '../../src';

class Store {
  public store: { [key: string]: any };
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

@defineMiddleware('multiRouteMiddleware')
@injectable()
class MultiRouteMiddlewareRouteMiddleware {
  public initMiddleware() {
    return (options: { [key: string]: any }) => {
      return (ctx: DarukContext, next: Next) => {
        ctx.body = ctx.body + ' multiRouteMiddleware';
        return next();
      };
    };
  }
}

@defineMiddleware('routeMiddleware')
@injectable()
class RouteMiddleware {
  public initMiddleware() {
    return (ctx: DarukContext, next: Next) => {
      ctx.body = 'routeMiddleware';
      return next();
    };
  }
}

@controller()
class Index {
  @get('/repeatMethod')
  @post('/repeatMethod')
  public async repeatMethod(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @all('/all')
  public async all(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @del('/del')
  public async del(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @get('/get')
  public async get(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @head('/head')
  public async head(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @options('/options')
  public async options(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @patch('/patch')
  public async patch(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @post('/post')
  public async post(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
  @put('/put')
  public async put(ctx: DarukContext, next: Next) {
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
  public redirect(ctx: DarukContext) {
    ctx.body = '';
  }
  @type('application/json')
  @get('/type')
  public type(ctx: DarukContext) {
    ctx.body = {
      foo: 1
    };
  }

  @header('foo', 'bar')
  @get('/header')
  public header(ctx: DarukContext) {
    ctx.body = 'bar';
  }

  @header({ foo: 'bar' })
  @get('/headers')
  public headers(ctx: DarukContext) {
    ctx.body = 'bar';
  }

  @get('/wildcard_(\\d)_(\\d).htm')
  public deatil(ctx: DarukContext) {
    ctx.body = {
      foo: 1
    };
  }

  @middleware('routeMiddleware')
  @get('/middleware')
  public async middleware(ctx: DarukContext, next: Next) {}

  @middleware('multiRouteMiddleware', { foo: 1 })
  @middleware('routeMiddleware')
  @get('/multiMiddleware')
  public async multiMiddleware(ctx: DarukContext, next: Next) {}

  @required({
    body: ['foo'],
    query: ['bar'],
    params: ['id']
  })
  @post('/required/:id')
  public async required(ctx: DarukContext, next: Next) {
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
  public typeParse(ctx: DarukContext) {
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
  public validate(ctx: DarukContext) {
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
  public validatePost(ctx: DarukContext) {
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
  public cache(ctx: DarukContext) {
    ctx.body = 'cacheData';
  }

  @disabled()
  @get('/disabled')
  public disabled(ctx: DarukContext) {
    ctx.body = '';
  }
  public _destroy() {
    // destroy something
  }
}

@controller()
class EmptyClass {}

@prefix('/v1/prefix')
@controller()
@priority(-1)
class PrefixIndexA {
  @get('/index')
  public async test(ctx: DarukContext, next: Next) {
    ctx.body = 'A';
    await next();
  }
}

@prefix('/v1/prefix')
@controller()
class PrefixIndexB {
  @get('/index')
  public async test(ctx: DarukContext, next: Next) {
    ctx.body = ctx.body + 'B';
  }
}

@prefix('/v1/prefix/test/deep')
@controller()
class PrefixTestDeep {
  @get('/json')
  public async json(ctx: DarukContext, next: Next) {
    ctx.body = { foo: 1 };
  }
}

@prefix('/disabled')
@disabled()
@controller()
class DisabledIndex {
  @get('/test')
  public async test(ctx: DarukContext, next: Next) {
    ctx.body = '';
  }
}

@timer()
@injectable()
class Timers {
  public cronTime!: string;
  public initTimer(daruk: Daruk) {
    this.cronTime = '* * * * * *';
  }
  public onTick(cron: CronJob) {
    cron.stop();
  }
  public onComplete(cron: CronJob, daruk: Daruk) {
    daruk.timerComplete = true;
  }
}
