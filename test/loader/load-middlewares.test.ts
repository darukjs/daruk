import request = require('supertest');
import { Daruk } from '../../src';
import { getApp } from '../utils';


const port = 3000;
const code200 = 200;

describe('define middleware', () => {
  let app: Daruk;
  let server: Daruk['httpServer'];
  before((done) => {
    app = getApp('load-middlewares');
    app.run(port, done);
    server = app.httpServer;
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