import 'daruk';
import connection from '../glues/connection';

declare module 'daruk' {
  interface Glue {
    connection: ReturnType<typeof connection>;
  }
}
