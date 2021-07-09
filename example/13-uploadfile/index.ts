import { controller, DarukContext, DarukServer, get, Next, post } from '../../src';

@controller()
class uploadFile {
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    ctx.body =
      '<form action="/upload" method="post" enctype="multipart/form-data" name="myfile"><input type="file" name="file"><input type="submit" value="上传"></form>';
  }
  @post('/upload')
  public async upload(ctx: DarukContext, next: Next) {
    const file = ctx.request?.files?.file;
    ctx.body = { path: file?.path };
  }
}

(async () => {
  let app = DarukServer({
    bodyOptions: {
      multipart: true,
      formidable: {
        // 上传目录
        uploadDir: __dirname,
        // 保留文件扩展名
        keepExtensions: true
      }
    }
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
