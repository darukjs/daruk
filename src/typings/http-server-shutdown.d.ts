declare module 'http-server-shutdown' {
  export class ShutDown {
    public serverClose: Function;
    public constructor(server: any, options: any);
  }
}
