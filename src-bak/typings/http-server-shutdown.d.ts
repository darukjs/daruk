declare module 'http-server-shutdown' {
  class ShutDown {
    public serverClose: Function;
    public constructor(server: any, options: any);
  }
  export = ShutDown;
}
