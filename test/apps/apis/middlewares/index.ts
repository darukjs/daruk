import { Daruk } from '../../../../src/';

export default function(daruk: Daruk) {
  daruk.registerMiddleware({
    name: 'testMiddleware',
    export: () => {}
  });
}
