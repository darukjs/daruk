import { Request } from 'daruk';

interface IRequest extends Request {
  body: any;
}

declare module 'daruk' {
  interface Context {
    render: (tpl: string, data?: any) => Promise<any>;
    request: IRequest;
  }
}
