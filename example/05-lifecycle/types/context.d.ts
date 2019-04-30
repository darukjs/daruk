import { Request } from 'daruk';

interface IRequest extends Request {
  id: string;
}

declare module 'daruk' {
  interface Context {
    request: IRequest;
  }
}
