import {
  Constructor,
  controller,
  Daruk,
  DarukContext,
  DarukServer,
  get,
  inject,
  plugin,
  PluginClass,
  provide,
  type
} from '../../src';

// type
type PromiseVoidFunc = () => Promise<void>;
type PromiseVoidArgsFunc = (...args: any[]) => Promise<void>;
type ClassFunc<
  Name extends string | symbol = string | symbol,
  Func extends Function = PromiseVoidArgsFunc
> = { [key in Name]: Func };

// ReflectList
class ReflectList<
  T extends Object = Object,
  K = any,
  V = any,
  P extends string | symbol = string | symbol
> {
  public Append(target: T, key: K, value: V, propertyKey?: P) {
    const list = this.Get(target, key);
    const newList = [value].concat(list);
    Reflect.defineMetadata(key, newList, target, propertyKey as string);
  }

  public Get(target: T, key: K, propertyKey?: P): V[] {
    return Reflect.getMetadata(key, target, propertyKey as string) || [];
  }
}

// ParamPlugin
const ParamReflect = new ReflectList<
  any,
  string,
  { index: number; name: string; type: Constructor },
  'param'
>();

export default function Param(name: string, type: Constructor = String) {
  return (target: any, targetKey: string, index: number) => {
    ParamReflect.Append(target.constructor, targetKey, { index, name, type }, 'param');
  };
}

@plugin()
class ParamPlugin implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    const controllers: any[] = Reflect.getMetadata('daruk:controller_class', Reflect) || [];
    for (const controller of controllers) {
      const routeFuncs: string[] =
        Reflect.getMetadata('daruk:controller_func_name', controller) || [];
      for (const func of routeFuncs) {
        const prototype: ClassFunc<string, PromiseVoidArgsFunc> = controller.prototype;
        const params = ParamReflect.Get(controller, func, 'param');
        if (params.length > 0) {
          const origin = prototype[func];
          prototype[func] = async function (
            ctx: DarukContext,
            next: PromiseVoidFunc,
            ...args: any[]
          ) {
            const params = ParamReflect.Get(controller, func, 'param');
            for (const { index, name, type } of params) {
              args[index - 2] = new type(ctx.query[name]);
            }
            await origin.call(this, ctx, next, ...args);
          };
        }
      }
    }
  }
}

// main
const main = async function () {
  try {
    const app = DarukServer();

    @provide('Db')
    class Db {
      public async FindByName(name: string) {
        return { name, address: '127.0.0.1' };
      }
    }

    @controller()
    class mainController {
      @inject('Db') private Db!: Db;

      @get(`find_by_name`)
      @type('application/json') // 如果函数`findByName`加上`type`装饰器 无法读取第二个及以后的参数
      public async findByName(ctx: DarukContext, _: any, @Param('name') name: string) {
        ctx.body = await this.Db.FindByName(name);
      }
    }

    await app.binding();
    app.listen(8899);
  } catch (error) {
    console.log(error);
  }
};

main(); // http://127.0.0.1:8899/find_by_name?name=ddkk
