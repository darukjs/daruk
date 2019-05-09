import request = require('supertest');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const port = 3000;
const code200 = 200;

describe('define route', () => {
  let app: Daruk;
  let server: Daruk['httpServer'];
  before((done) => {
    app = getApp('load-controllers');
    app.listen(port, done);
    server = app.httpServer;
  });

  after((done) => {
    app.httpServer.close(done);
  });

  it('define route "/"', (done) => {
    request(server)
      .get('/')
      .expect(code200, done);
  });
  it('define route "/nest" with "index" file name', (done) => {
    request(server)
      .get('/nest')
      .expect(code200, done);
  });
  it('define route "/nest/nestFile" with nest file', (done) => {
    request(server)
      .get('/')
      .expect(code200, done);
  });
  it('define route "/decoratorPath" with decorator param', (done) => {
    request(server)
      .get('/decoratorPath')
      .expect(code200, done);
  });
});
