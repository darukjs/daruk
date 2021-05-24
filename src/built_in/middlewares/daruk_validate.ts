import { parameter } from 'daruk-validate';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass } from '../../typings/daruk';

@defineMiddleware('daruk_validate')
class DarukValidate implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    const error = parameter(daruk.app, daruk.options.validateOptions);
    // options.error = false no return error
    if (daruk.options.validateOptions.error) {
      return error;
    }
  }
}
