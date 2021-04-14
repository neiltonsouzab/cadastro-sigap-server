import mailConfig from '@config/mail';
import { container } from 'tsyringe';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SefinMailProvider from './implementations/SefinMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  sefin: container.resolve(SefinMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
