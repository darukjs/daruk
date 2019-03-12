import { BaseService, Daruk } from '../../../../src/';

export default function(daruk: Daruk) {
  daruk.registerService({
    name: 'testService',
    export: class TestService extends BaseService {}
  });
}
