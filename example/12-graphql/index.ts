import { ApolloServer } from 'apollo-server-koa';
import { controller, DarukContext, DarukServer, get, Next } from '../../src';
import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

@controller()
class HelloWorld {
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    ctx.body = 'hello world';
  }
}

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  let myapp = DarukServer();
  let port = 3000;
  await myapp.binding();
  server.applyMiddleware({ app: myapp.app });
  myapp.listen(port);
  myapp.logger.info(`app listen port ${port}`);
})();
