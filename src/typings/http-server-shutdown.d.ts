declare module 'http-server-shutdown' {
  import Http = require('http');
  import Https = require('https');

  type Server = Http.Server | Https.Server;
  class ShutDown {
    public serverClose: Function;
    public constructor(
      server: Server,
      options: {
        signals?: string[];
        timeout?: number;
        before?: Function;
        after?: Function;
        errCb?: (e: Error) => void;
        monitor: boolean;
      }
    );
  }
  export = ShutDown;
}
