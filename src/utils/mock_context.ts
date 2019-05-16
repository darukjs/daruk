import { Context, RpcReq, RpcRes } from "../typings/daruk-rpc";

const obj2Str = (rpcReq: any) => {
  return Object.keys(rpcReq)
    .map((key: any) => {
      return `${key}=${encodeURIComponent(rpcReq[key])}`;
    })
    .join("&");
};

export default function mockContext(
  app: any,
  config: {
    path: string;
    rpcReq: RpcReq;
    rpcRes: RpcRes;
  }
): Context {
  const context = {
    app,
    status: 404,
    path: config.path,
    rpcReq: config.rpcReq,
    rpcRes: config.rpcRes,
    req: {
      httpVersionMajor: "tcp",
      httpVersionMinor: ''
    },
    res: {},
    headers: {
      "user-agent": config.rpcReq.qua2,
      "x-forwarded-for": ''
    },
    socket: {},
    id: '',
    originalUrl: `${config.path}?${obj2Str(config.rpcReq)}`,
    method: "rpc",
    request: {
      url: config.path,
      id: ''
    },
    response: {},
    get(key: string) {
      // tslint:disable-next-line
      return this[key];
    },
    set(key: string, val: any) {
      // tslint:disable-next-line
      this[key] = val;
    },
    query: {},
    body: {}
  };
  Object.defineProperty(context.response, "status", {
    get() {
      return context.status;
    }
  });
  return context;
}
