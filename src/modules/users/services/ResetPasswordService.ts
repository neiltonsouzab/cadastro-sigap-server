import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token inválido');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (user.blocked) {
      throw new AppError('Usuário bloqueado.');
    }

    const tokenCreatedAt = userToken.created_at;
    const tokenExpiredDate = addHours(tokenCreatedAt, 24);

    if (isAfter(Date.now(), tokenExpiredDate)) {
      throw new AppError('Token expirado.');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    user.password = passwordHash;
    user.enabled = true;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
