import { ValidatorOptions } from 'class-validator';
import { Constructor } from '..';
export declare const ValidateEntity: (value: any, entityCon: Constructor, validatorOptions?: ValidatorOptions | undefined) => Promise<any>;
