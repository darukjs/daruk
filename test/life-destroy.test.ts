/**
 * @author jingyu16
 * @fileOverview 测试 controller、service 的 _destroy 方法被调用
 * @date 2019-03-08
 */

import request = require('supertest');
import { Daruk } from '../src';
import { getApp } from './utils';

const port = 3000;
const code200 = 200;

describe('life destroy', () => {
  let app: Daruk;
  let server: Daruk['httpServer'];
  before((done) => {
    app = getApp('life-destroy');
    app.listen(port, done);
    server = app.httpServer;
  });

  after((done) => {
    app.httpServer.close(done);
  });

  it('should call controller._destroy', (done) => {
    request(server)
      .get('/')
      .expect(code200)
      .expect('_destroyed', done);
  });
  it('should call service._destroy', (done) => {
    request(server)
      .get('/testService')
      .expect(code200)
      .expect('_destroyed', done);
  });
  it('should service be instantiated only once in a request', (done) => {
    request(server)
      .get('/testService/instantiation')
      .expect(code200)
      .expect('1', done);
  });
});
