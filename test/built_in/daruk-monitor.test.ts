import fs = require('fs');
import request = require('supertest');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const port = 3000;
const code200 = 200;
const code404 = 404;

const auth = {
  name: 'monitor',
  password: 'monitor'
};

describe('daruk-monitor error v8ProfilerPath', function cb() {
  let app: Daruk;
  let server: Daruk['httpServer'];
  before((done) => {
    app = getApp('', {
      monitor: {
        enable: true,
        auth: { ...auth },
        v8AnalyticsPath: '',
        v8ProfilerPath: ''
      }
    });
    app.listen(port, done);
    server = app.httpServer;
  });

  after((done) => {
    server.close(done);
    deleteFolderRecursive(process.cwd() + '/profiler');
  });

  it('/monitor/ start up with v8ProfilerPath error', (done) => {
    request(server)
      .get('/monitor/profiler/function')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return res.text === `The argument 'id' must be a non-empty string. Received ''`;
      })
      .end(done);
  });
});

describe('daruk-monitor', function cb() {
  let app: Daruk;
  let server: Daruk['httpServer'];
  before((done) => {
    app = getApp('', {
      monitor: {
        enable: true,
        auth: { ...auth }
      }
    });
    app.listen(port, done);
    server = app.httpServer;
  });

  after((done) => {
    server.close(done);
    deleteFolderRecursive(process.cwd() + '/profiler');
  });

  it('/monitor auth failed', function(done) {
    // tslint:disable-next-line
    this.timeout(1000);

    request(server)
      .get('/monitor/profiler?period=1000')
      .expect(code200)
      .auth(auth.name, auth.password + 'error')
      .end((err, res) => {
        if (err.message === 'expected 200 "OK", got 401 "Unauthorized"') {
          done();
        }
      });
  });

  it('/monitor/not-found should not throw error when request non-existing route', (done) => {
    request(server)
      .get('/monitor/not-found')
      .auth(auth.name, auth.password)
      .expect(code404)
      .end(done);
  });

  it('/monitor/profiler', (done) => {
    request(server)
      .get('/monitor/profiler')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return 'cpu' in res.body && 'memory' in res.body;
      })
      .end(done);
  });

  it('/monitor/profiler/function', (done) => {
    request(server)
      .get('/monitor/profiler/function')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return res.text;
      })
      .end(done);
  });

  it('/monitor/profiler/mem', function(done) {
    // tslint:disable-next-line
    this.timeout(10000);
    request(server)
      .get('/monitor/profiler/mem')
      .expect(code200)
      .auth(auth.name, auth.password)
      .end(done);
  });

  it('/monitor/profiler/mem-analytics', function(done) {
    // tslint:disable-next-line
    this.timeout(15000);
    request(server)
      .get('/monitor/profiler/mem-analytics')
      .expect(code200)
      .auth(auth.name, auth.password)
      .expect((res) => {
        return res.body;
      })
      .end(done);
  });
});

function deleteFolderRecursive(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
