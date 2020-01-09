import request = require('supertest');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const port = 3000;
const code200 = 200;

describe('define middleware', () => {
  let app: Daruk;
  let server: Daruk['httpServer'];
  before((done) => {
    getApp('load-middlewares', {
      // 测试 daruk-logger middleware 的参数
      loggerMiddleware: {
        filter: () => true,
        requiredLogs: [
          'remote_addr',
          'method',
          'url',
          'http_version',
          'status',
          'referrer',
          'request_time',
          'perf',
          'user_agent'
        ]
      }
    }).then((Daruk) => {
      app = Daruk;
      app.listen(port, done);
      server = app.httpServer;
    });
  });

  after((done) => {
    app.httpServer.close(done);
  });

  it('should middleware execute in order', (done) => {
    request(server)
      .get('/')
      .expect(code200)
      .expect('fileMiddleware;folderMiddleware', done);
  });
});
