import { Daruk } from 'daruk';

const myApp = new Daruk('myapp', { rootPath: __dirname, debug: process.env.NODE_ENV === 'dev' });
const port = 3000;
myApp.listen(port);
