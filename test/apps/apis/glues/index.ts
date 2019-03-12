import { Daruk } from '../../../../src/';

export default function(daruk: Daruk) {
  // 测试 array 形式的 参数
  daruk.registerGlue([{
    name: 'testGlue',
    export: {}
  }]);
}
