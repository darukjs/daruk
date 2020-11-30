import { Daruk, DarukContext, defineMiddleware, MiddlewareClass, Next } from '../../../src';

@defineMiddleware('errorMid')
class ErrorMid implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      try {
        await next();
      } catch (e) {
        daruk.logger.error(e.stack);
      }
    };
  }
}
