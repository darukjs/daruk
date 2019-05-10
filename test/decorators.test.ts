import chai = require('chai');
import request = require('supertest');
import { config, Daruk, glue, logger, util } from '../src';
import { getApp } from './utils';

const port = 3000;
const code200 = 200;
const assert = chai.assert;

describe('decorators', () => {
  let app: Daruk;
  let server: Daruk['httpServer'];
  before((done) => {
    app = getApp('decorators');
    app.listen(port, done);
    server = app.httpServer;
  });

  after((done) => {
    app.httpServer.close(done);
  });

  it('decorator "@all"', (done) => {
    request(server)
      .get('/all')
      .expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(server)
      .del('/del')
      .expect(code200, done);
  });
  it('decorator "@get"', (done) => {
    request(server)
      .get('/get')
      .expect(code200, done);
  });
  it('decorator "@head"', (done) => {
    request(server)
      .head('/head')
      .expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(server)
      .del('/del')
      .expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(server)
      .del('/del')
      .expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(server)
      .del('/del')
      .expect(code200, done);
  });
  it('decorator "@options"', (done) => {
    request(server)
      .options('/options')
      .expect(code200, done);
  });
  it('decorator "@patch"', (done) => {
    request(server)
      .patch('/patch')
      .expect(code200, done);
  });
  it('decorator "@post"', (done) => {
    request(server)
      .post('/post')
      .expect(code200, done);
  });
  it('decorator "@put"', (done) => {
    request(server)
      .put('/put')
      .expect(code200, done);
  });
  it('decorator @json', (done) => {
    request(server)
      .get('/json1')
      .expect(code200)
      .expect({ foo: 1 }, done);
  });
  it('decorator @JSON', (done) => {
    request(server)
      .get('/json2')
      .expect(code200)
      .expect({ foo: 1 }, done);
  });

  it('decorator "@middleware"', (done) => {
    request(server)
      .get('/middleware')
      .expect(code200)
      .expect('routeMiddleware', done);
  });

  it('decorator "multi @middleware"', (done) => {
    request(server)
      .get('/multiMiddleware')
      .expect(code200)
      .expect('routeMiddleware multiRouteMiddleware', done);
  });

  it('decorator "@config"', () => {
    class A {
      @config('option1')
      public option1: any;
    }
    assert(new A().option1 !== undefined);
  });
  it('decorator "@glue"', () => {
    class A {
      @glue('testGlue')
      public testGlue: any;
    }
    assert(new A().testGlue !== undefined);
  });
  it('decorator "@util"', () => {
    class A {
      @util('util1')
      public util1: any;
    }
    assert(new A().util1 !== undefined);
  });
  it('decorator "@logger"', () => {
    class A {
      @logger()
      public logger: any;
    }
    assert(new A().logger !== undefined);
  });
  it('decorator "@logger" with fileInfo', () => {
    class A {
      @logger('customFileInfo')
      public logger: any;
    }
    // 自定义 logger 的 fileInfo 成功
    assert(new A().logger.customFileInformation === 'customFileInfo');
  });
});
