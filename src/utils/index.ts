/**
 * @desc 并行执行，并且其中一个任务执行失败不影响其他任务的执行
 * @param Array<Function> tasks - 要执行的任务
 * @param Function cb - 并行任务执行完毕的回调
 * @param any scope - 执行任务函数的作用域
 */
export function parallelWithNoBreak(tasks: Array<Function>, cb?: Function, scope?: any) {
  let cbCallTimes = 0;
  let len = tasks.length;
  const result: Array<any> = [];
  tasks.forEach((func) => {
    func.call(scope || null, (res: any) => {
      result.push(res);
      cbCallTimes++;
      if (cbCallTimes === len) {
        if (cb) cb(result);
      }
    });
  });
}

/**
 * @desc 简版 class 混入装饰器
 * @param BaseClass Function - 要混入的类
 */
export function SimpleMixin(BaseClass: Function) {
  return (DerivedClass: Function) => {
    Object.getOwnPropertyNames(BaseClass.prototype).forEach((name) => {
      if (name !== 'constructor') {
        DerivedClass.prototype[name] = BaseClass.prototype[name];
      }
    });
  };
}

/**
 * @desc 同时支持导入 es6 模块和 common.js 模块
 */
export function uRequire(path: string) {
  const module = require(path);
  return module.__esModule && module.default ? module.default : module;
}

/**
 * @desc 判断 subClass 是否是 superClass 的子类
 */
export function isSubClass(subClass: any, superClass: any) {
  let proto = subClass;
  while (proto) {
    if (proto === superClass) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

export * from './debug_log';
export * from './filter_built_in_module';
export * from './is_js_ts';
