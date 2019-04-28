import { Daruk } from 'daruk';

const port = 3000;
const myApp = new Daruk('my-comments-app', {
  rootPath: __dirname,
  debug: process.env.NODE_ENV === 'dev'
});

myApp.run(port);
