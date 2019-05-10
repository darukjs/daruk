import { ApolloServer } from 'apollo-server-koa';
import { Daruk } from 'daruk';
import { resolvers } from './graphQL/resolvers';
import { typeDefs } from './graphQL/typeDefs';

const server = new ApolloServer({ typeDefs, resolvers });

const myApp = new Daruk('myapp', { rootPath: __dirname, debug: process.env.NODE_ENV === 'dev' });

server.applyMiddleware({ app: myApp });

const port = 3000;
myApp.listen(port, () => {
  myApp.logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
