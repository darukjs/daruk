import chai = require('chai');
import { assert } from 'console';
import request = require('supertest');
import { Daruk, DarukServer } from '../src';

const port = 3000;
const code200 = 200;
const code404 = 404;
const code302 = 302;

describe('decorators', () => {
  let app: Daruk['httpServer'];
  let server = DarukServer({
    rootPath: __dirname,
    debug: false,
    loggerOptions: {
      disable: true,
      overwriteConsole: false
    }
  });
  before(async () => {
    await server.loadFile('./decorators');
    await server.binding();
    await server.listen(port);
    app = server.httpServer;
  });

  after((done) => {
    server.httpServer.close(done);
  });

  it('decorator @service', (done) => {
    let requestSize = [];
    request(app)
      .get('/methodA?id=A')
      .expect(code200)
      .expect('A', (err, res) => {
        if (err) throw err;
        requestSize.push(true);
        if (requestSize.length === 2 && !err) {
          done();
        }
      });
    request(app)
      .get('/methodB?id=B')
      .expect(code200)
      .expect('B', (err, res) => {
        if (err) throw err;
        requestSize.push(true);
        if (requestSize.length === 2 && !err) {
          done();
        }
      });
    request(app)
      .get('/methodC?id=C')
      .expect(code200)
      .expect('C', (err, res) => {
        if (err) throw err;
        requestSize.push(true);
        if (requestSize.length === 2 && !err) {
          done();
        }
      });
  });

  it('decorator repeat method', (done) => {
    request(app)
      .get('/repeatMethod')
      .expect(code200, () => {
        request(app).post('/repeatMethod').expect(code200, done);
      });
  });

  it('decorator "@all"', (done) => {
    request(app).get('/all').expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(app).del('/del').expect(code200, done);
  });
  it('decorator "@get"', (done) => {
    request(app).get('/get').expect(code200, done);
  });
  it('decorator "@head"', (done) => {
    request(app).head('/head').expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(app).del('/del').expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(app).del('/del').expect(code200, done);
  });
  it('decorator "@del"', (done) => {
    request(app).del('/del').expect(code200, done);
  });
  it('decorator "@options"', (done) => {
    request(app).options('/options').expect(code200, done);
  });
  it('decorator "@patch"', (done) => {
    request(app).patch('/patch').expect(code200, done);
  });
  it('decorator "@post"', (done) => {
    request(app).post('/post').expect(code200, done);
  });
  it('decorator "@put"', (done) => {
    request(app).put('/put').expect(code200, done);
  });

  it('decorator @type', (done) => {
    request(app)
      .get('/type')
      .expect('Content-Type', /application\/json/)
      .expect(code200, done);
  });

  it('decorator @header', (done) => {
    request(app).get('/header').expect(code200).expect('foo', 'bar').expect('bar', done);
  });

  it('decorator @header', (done) => {
    request(app).get('/headers').expect(code200).expect('foo', 'bar').expect('bar', done);
  });

  it('decorator @get for wildcard', (done) => {
    request(app).get('/wildcard_3_4.htm').expect(code200, done);
  });

  it('decorator @redirect', (done) => {
    request(app).get('/redirect').expect(code302, done);
  });

  it('decorator @prefix', (done) => {
    request(app).get('/v1/prefix/index').expect(code200, done);
  });

  it('decorator @priority', (done) => {
    request(app).get('/v1/prefix/index').expect(code200).expect('AB', done);
  });

  it('decorator @prefix deep controller', (done) => {
    request(app).get('/v1/prefix/test/deep/json').expect(code200, done);
  });

  it('decorator "prefix for @controller"', (done) => {
    request(app).get('/v1/prefix/controller/index').expect(code200, done);
  });

  it('decorator "middleware for @controller"', (done) => {
    request(app).get('/ControllerMiddleware').expect(code200).expect('routeMiddleware', done);
  });

  it('decorator "@middleware"', (done) => {
    request(app).get('/middleware').expect(code200).expect('routeMiddleware', done);
  });

  it('decorator "multi @middleware"', (done) => {
    request(app)
      .get('/multiMiddleware')
      .expect(code200)
      .expect('routeMiddleware multiRouteMiddleware', done);
  });

  it('decorator @validate get success', (done) => {
    request(app)
      .get('/validate')
      .query({
        foo: 'bar'
      })
      .expect(code200, done);
  });

  it('decorator @validate post success', (done) => {
    request(app)
      .post('/validate')
      .send({
        foo: 'foo'
      })
      .expect(code200, done);
  });

  it('decorator @validate post default success', (done) => {
    request(app).post('/validate').expect(code200, done);
  });

  it('decorator @cache', (done) => {
    request(app)
      .get('/cache')
      .query({
        foo: 'bar'
      })
      .expect(code200, () => {
        request(app)
          .get('/cache')
          .query({
            foo: 'bar'
          })
          .expect(code200, done);
      });
  });

  it('decorator @disabled method', (done) => {
    request(app).get('/disabled').expect(code404, done);
  });

  it('decorator @disabled class', (done) => {
    request(app).get('/disabled/test').expect(code404, done);
  });

  it('decorator @timer class', function (done) {
    const timerDelay = 5000;
    const timeOut = 1200;
    // tslint:disable-next-line
    this.timeout(timerDelay);
    setTimeout(() => {
      assert(server.timerComplete === true);
      done();
    }, timeOut);
  });

  it('decorator @middlewares for @controller and @method', (done) => {
    request(app)
      .get('/middlewares')
      .expect(code200)
      .expect('1 2 3 4 5 6 7 8 9 10 getMiddlewares', () => {
        request(app)
          .post('/middlewares')
          .expect(code200)
          .expect('1 2 3 4 5 6 7 8 9 postMiddlewares', () => {
            request(app)
              .put('/middlewares')
              .expect(code200)
              .expect('1 2 3 4 5 6 7 putMiddlewares', done);
          });
      });
  });
});
