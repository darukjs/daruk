import 'daruk';
import utils from '../utils';

declare module 'daruk' {
  interface Util extends ReturnType<typeof utils> {}
}
