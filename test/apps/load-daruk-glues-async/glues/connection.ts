import { Daruk } from '../../../../src';

export default async function (daruk: Daruk) {
  return new Promise(resolve => {
    setTimeout(() => resolve('promise'));
  });
}
