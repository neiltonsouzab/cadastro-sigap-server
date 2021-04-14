import Ug from '@modules/ugs/infra/typeorm/entities/Ug';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: number;
  cpf: string;
  name: string;
  nickname: string;
  email: string;
  type: string;
  blocked: boolean;
  ugs: Array<{
    id: number;
  }>;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    cpf,
    name,
    nickname,
    email,
    type,
    blocked,
    ugs,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const userCpfExists = await this.usersRepository.findByCpf(cpf);

    if (userCpfExists && userCpfExists.id !== user_id) {
      throw new AppError('CPF já cadastrado para outro usuário.');
    }

    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists && userEmailExists.id !== user_id) {
      throw new AppError('E-mail já cadastrado para outro usuário.');
    }

    user.cpf = cpf;
    user.name = name;
    user.nickname = nickname;
    user.email = email;
    user.type = type;
    user.blocked = blocked;
    user.ugs = ugs as Array<Ug>;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
