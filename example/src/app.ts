import daruk from './daruk.init';

const port = process.env.PORT || 8090;
const host = process.env.IP || 'localhost';

daruk.on('error', (err: Error, ctx) => {
  daruk.logger.error(err.stack, ctx);
});


daruk.runRpc();
daruk.run(port, host);
