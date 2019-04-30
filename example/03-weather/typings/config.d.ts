import 'daruk';
import config from '../config/config.default';

type MyConfig = typeof config;

declare module 'daruk' {
  interface Config extends MyConfig {}
}
