import path from 'path';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  cpf: string;
  name: string;
  nickname: string;
  email: string;
  type: string;
  ugs: Array<{
    id: number;
  }>;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    cpf,
    name,
    nickname,
    email,
    type,
    ugs,
  }: IRequest): Promise<User> {
    const userCpfExists = await this.usersRepository.findByCpf(cpf);

    if (userCpfExists) {
      throw new AppError('CPF já cadastrado para outro usuário.');
    }

    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError('E-mail já cadastrado para outro usuário.');
    }

    const user = await this.usersRepository.create({
      cpf,
      name,
      nickname,
      email,
      type,
      ugs,
    });

    const userToken = await this.usersTokensRepository.create(user.id);

    const confirmAccountTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'confirm_account.hbs',
    );

    this.mailProvider.sendMail({
      to: {
        name,
        address: email,
      },
      subject: 'Confirmação de cadastro',
      templateData: {
        file: confirmAccountTemplate,
        variables: {
          name,
          link: `${process.env.APP_WEB_URL}/confirm-account?token=${userToken.token}`,
        },
      },
    });

    return user;
  }
}

export default CreateUserService;
