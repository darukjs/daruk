
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass } from '../../typings/daruk';
import { parameter } from "daruk-validate";

@defineMiddleware("daruk_validate")
class DarukValidate implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    parameter(daruk.app as any);
  }
}
