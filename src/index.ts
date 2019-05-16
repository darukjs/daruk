import { Rpc } from "rpc";
import assert = require("assert");
import { Daruk as BaseDaruk } from "daruk";
import is = require("is");
import compose = require("koa-compose");
import deepAssign = require("object-assign-deep");
import { join } from "path";
import "reflect-metadata";
import { CONTROLLER_FUNC_NAME, CONTROLLER_PATH } from "./constants";
import daruk_context_loader from "./daruk_context_loader";
import { Context, HandleFunc, RpcReq, RpcRes } from "./typings/daruk-rpc";
import { loadController, mockContext } from "./utils";

const codeMap = {
  SERVER_OK: 200,
  SERVER_ERROR: 500,
  SERVER_NOTFOUND: 404
};

interface IRpcOptions {
  [key: string]: any;
}

const concatRpcName = (name: string) => `${name}Imp`;

function getDefaultOptions(options: any): IRpcOptions {
  const { rpcOptions, rootPath } = options;
  return {
    rpcControllerPath: join(rootPath, "rpcControllers"),
    serverConfig: {},
    middlewareOrder: []
  };
}

class RpcRouter {
  public routesMap: { [key: string]: HandleFunc } = {};

  public rpc(path: string, handle: HandleFunc) {
    this.routesMap[path] = handle;
  }
  public routes() {
    return (ctx: Context, next: Function) => {
      const { path } = ctx;
      const handle = this.routesMap[path];
      if (typeof handle !== "function") {
        return next();
      }
      ctx.status = codeMap.SERVER_OK;
      // @ts-ignore
      return compose([handle])(ctx, next);
    };
  }
}

export * from "daruk";

export class Daruk extends BaseDaruk {
  public rpcOptions: IRpcOptions;
  private rpcRouter: RpcRouter;
  // 针对 rpc 的中间件，其 middleOrder 需要单独声明
  private rpcMiddleware: HandleFunc[] = [];

  public constructor(name: string, options: any) {
    super(name, options);
    if (!options.rpcOptions) return;
    this.rpcOptions = deepAssign(
      {},
      getDefaultOptions(options),
      options.rpcOptions
    );
    this.initRpc();
  }

  public runRpc(cb?: Function) {
    const { serverConfig } = this.rpcOptions;
    const rpcImpClass = this.getRpcImpClass();

    // rpc 请求到服务器时，Rpc server会调用 rpcImpClass 中对应的方法
    // 在 initRpcImp 方法中将 rpcImpClass 原型上的方法赋值为了统一的 handle
    // 从而实现了 rpc 的路由
    const rpcServer = new Rpc(rpcImpClass);
    rpcServer.start();
  }

  public createRpcContext(
    path: string,
    rpcReq: RpcReq,
    rpcRes: RpcRes
  ): Context {
    return mockContext(this, {
      path,
      rpcRes,
      rpcReq
    });
  }
  // 获取 rpc 的实现 class，这里不用管，是去加载通过工具生成的模板代码
  // 也就是 ../example/src/rcpImp
  private getRpcImpClass() {
    const { moduleName, interfaceName, rpcImpPath } = this.rpcOptions;
    const rpcImpModule = require(rpcImpPath);
    return rpcImpModule[moduleName][concatRpcName(interfaceName)];
  }
  private initRpc() {
    this.loadRpcController();
    this.initRpcImp();
    this.initRpcMiddleware();
    this.initRpcRouter();
  }
  private initRpcImp() {
    const rpcImpClass = this.getRpcImpClass();
    const rpcImpProto = rpcImpClass.prototype;
    const rpcHandles = Object.getOwnPropertyNames(rpcImpProto).filter(key => {
      return (
        key !== "constructor" &&
        key !== "initialize" &&
        typeof rpcImpProto[key] === "function"
      );
    });
    rpcHandles.forEach(path => {
      // rpc server 会调用这里的 rpcImpClass 的 handle
      // 也就是会调用 this.rpcHandle(path) 的返回的函数
      rpcImpProto[path] = this.rpcHandle(path);
    });
  }
  private initRpcMiddleware() {
    this.useRpcMiddleware(daruk_context_loader, "daruk_context_loader");
    const { rpcMiddlewareOrder } = this.rpcOptions;
    if (!rpcMiddlewareOrder) return;
    // tslint:disable-next-line
    const self = this;
    rpcMiddlewareOrder.forEach(function useMiddleware(name: string) {
      // @ts-ignore
      const middleware = self.module.middleware[name];
      assert(
        is.undefined(middleware) === false,
        `[middleware] ${name} is not found`
      );
      // 有些中间件是直接修改 koa 实例，不会返回一个函数
      // 因此只 use 函数类型的中间件
      if (is.fn(middleware)) {
        self.useRpcMiddleware(middleware, name);
      }
    });
    this.prettyLog(JSON.stringify(rpcMiddlewareOrder), {
      type: "rpcMiddleware",
      init: true
    });
  }
  private loadRpcController() {
    const routePath2ControllerMap = loadController(
      this.rpcOptions.rpcControllerPath
    );
    // @ts-ignore
    this.mergeModule("rpcController", routePath2ControllerMap);
  }
  private initRpcRouter() {
    this.rpcRouter = new RpcRouter();
    // tslint:disable-next-line
    const self = this;
    // @ts-ignore
    const controllers = this.module.rpcController || {};
    Object.keys(controllers).forEach(function handleControllers(path: string) {
      // @ts-ignore
      const ControllerClass = controllers[path];
      // daruk 解析出的路由包含斜线，需要删除
      const rpcPath = path.replace(/\//g, "");
      const routeFuncs =
        Reflect.getMetadata(CONTROLLER_FUNC_NAME, ControllerClass) || [];
      routeFuncs.forEach(function defineRoute(funcName: string) {
        const { method } = Reflect.getMetadata(
          CONTROLLER_PATH,
          ControllerClass,
          funcName
        );
        self.prettyLog(`${method} - ${rpcPath}`, {
          type: "router",
          init: true
        });
        self.rpcRouter.rpc(rpcPath, async function routeHandle(
          ctx: Context,
          next: () => Promise<void>
        ): Promise<any> {
          let controllerInstance = new ControllerClass(ctx);
          await controllerInstance[funcName](ctx, next);
          // 允许用户在 controller 销毁前执行清理逻辑
          if (is.fn(controllerInstance._destroy)) {
            controllerInstance._destroy();
          }
          controllerInstance = null;
        });
      });
    });
    this.useRpcMiddleware(this.rpcRouter.routes(), "router");
  }
  private rpcHandle(path: string) {
    const handleRequest = (
      rpcServer: RpcServer,
      rpcReq: RpcReq,
      rpcRes: RpcRes
    ) => {
      const fn = compose(this.rpcMiddleware);
      const ctx = this.createRpcContext(path, TarsCurrent, rpcReq, rpcRes);
      ctx.status = codeMap.SERVER_NOTFOUND;
      // @ts-ignore
      fn(ctx)
        .then(() => {
          // tslint:disable-next-line
          rpcServer.sendResponse(ctx.status, ctx.body);
        })
        .catch((e: Error) => {
          this.emit("error", e);
          rpcServer.sendResponse(codeMap.SERVER_ERROR, rpcRes);
        });
    };

    return handleRequest;
  }
  private useRpcMiddleware(fn: HandleFunc, name: string) {
    if (typeof fn !== "function") {
      throw new TypeError("middleware must be a function!");
    }
    this.rpcMiddleware.push(fn);
  }
}

export function rpc(): MethodDecorator {
  return (
    proto: Function,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const target = proto.constructor;
    // 获取该类上已经被装饰器装饰过的方法
    const funcs = Reflect.getMetadata(CONTROLLER_FUNC_NAME, target) || [];
    // 加入当前方法名
    funcs.push(propertyKey);
    // 保存该类中被装饰过的方法
    Reflect.defineMetadata(CONTROLLER_FUNC_NAME, funcs, target);
    // 保存装饰器提供的路由信息
    const routerMeta = {
      method: "rpc"
    };
    Reflect.defineMetadata(CONTROLLER_PATH, routerMeta, target, propertyKey);
  };
}
