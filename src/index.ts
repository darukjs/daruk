import Daruk from './core/daruk';
import { darukContainer } from './core/inversify.config';
import { TYPES } from './core/types';

const webapp = darukContainer.get<Daruk>(TYPES.Daruk);

export { webapp };
export * from './decorators';

webapp.initOptions();
webapp.loadPlugin();
// tslint:disable-next-line
webapp.listen(3000);
