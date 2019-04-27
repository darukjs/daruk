import { Daruk } from '../../src';

const port = 3000;
const myApp = new Daruk('my-dog-app', {
  rootPath: __dirname,
  debug: process.env.NODE_ENV === 'dev'
});

myApp.run(port);
