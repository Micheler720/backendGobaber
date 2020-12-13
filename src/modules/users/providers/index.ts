import { container } from 'tsyringe';

import IHashProvider from './HashProviders/models/IHashProvider';
import BCryptHashProvider from './HashProviders/implementations/BCryptHashProvider';

container.register<IHashProvider>('HashProvider', BCryptHashProvider);
