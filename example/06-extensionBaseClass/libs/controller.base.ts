import { BaseController, Context } from 'daruk';

class ExtensionBaseController extends BaseController {
  public constructor(ctx: Context) {
    super(ctx);
  }
  public formatJSON(content: string, code: number) {
    let format = {
      code,
      content
    };
    return format;
  }
}

export default ExtensionBaseController;
