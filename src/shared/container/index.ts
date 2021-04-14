import './providers';
import '@modules/users/providers';

import UgsRegistrationsRepository from '@modules/ugs/infra/typeorm/repositories/UgsRegistrationsRepository';
import UgsRepository from '@modules/ugs/infra/typeorm/repositories/UgsRepository';
import IUgsRegistrationsRepository from '@modules/ugs/repositories/IUgsRegistrationsRepository';
import IUgsRepository from '@modules/ugs/repositories/IUgsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUgsRepository>('UgsRepository', UgsRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokenRepository,
);

container.registerSingleton<IUgsRegistrationsRepository>(
  'UgsRegistrationsRepository',
  UgsRegistrationsRepository,
);
