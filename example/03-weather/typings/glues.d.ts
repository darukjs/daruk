import 'daruk';
import cache from '../glues/cache';

declare module 'daruk' {
  interface Glue {
    cache: ReturnType<typeof cache>;
  }
}
