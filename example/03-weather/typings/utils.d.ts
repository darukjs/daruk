import 'daruk';
import utils from '../utils/index';

declare module 'daruk' {
  interface Util extends ReturnType<typeof utils> {}
}
