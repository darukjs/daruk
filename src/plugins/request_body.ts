import { getMetadataArgsStorage } from 'typeorm';
import { validate, ValidatorOptions } from 'class-validator';
import { Constructor, DarukContext } from '..';
import { CONTROLLER_CLASS, CONTROLLER_FUNC_NAME, REQUESTBODY_CLASS } from '../decorators/constants';
import { Next } from '../typings/daruk';
import Daruk from '../core/daruk';
import { plugin } from '../decorators';
import { PluginClass } from '../typings/daruk';

export const ValidateEntity = async function (
  value: any,
  entityCon: Constructor,
  validatorOptions?: ValidatorOptions
) {
  if (typeof value !== 'object') {
    throw new Error('检验的数据必须为对象类型');
  }
  const columns = getMetadataArgsStorage().columns.filter((info) => info.target === entityCon);
  const entity = Reflect.construct(entityCon, []);
  for (const col of columns) {
    const name = col.propertyName;
    entity[name] = value[name];
  }
  const errors = await validate(entity, validatorOptions);
  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
  return entity;
};

@plugin()
class RequestBodyPlugin implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    const controllers: any[] = Reflect.getMetadata(CONTROLLER_CLASS, Reflect) || [];
    for (const controller of controllers) {
      const routeFuncs: string[] = Reflect.getMetadata(CONTROLLER_FUNC_NAME, controller) || [];
      for (const func of routeFuncs) {
        const prototype: any = controller.prototype;
        const params: any[] = Reflect.getMetadata(REQUESTBODY_CLASS, controller, func) || [];
        if (params.length > 0) {
          const origin = prototype[func];
          prototype[func] = async function (ctx: DarukContext, next: Next, ...args: any[]) {
            for (const { index, entity, validatorOptions } of params) {
              args[index - 2] = await ValidateEntity(ctx.request.body, entity, validatorOptions);
            }
            await origin.call(this, ctx, next, ...args);
          };
        }
      }
    }
  }
}
