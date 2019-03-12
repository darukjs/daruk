import { Daruk } from '../../../../src/';

export default function(daruk: Daruk) {
  daruk.registerUtil({
    name: 'testUtil',
    export: () => {}
  });
}
