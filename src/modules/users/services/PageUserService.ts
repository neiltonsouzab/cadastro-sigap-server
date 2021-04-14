import IPage from '@shared/models/IPage';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  page: number;
  perPage: number;
  filter?: string;
}

@injectable()
class PageUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ page, perPage, filter }: IRequest): Promise<IPage<User>> {
    const usersPage = await this.usersRepository.find({
      page,
      perPage,
      filter,
    });

    return usersPage;
  }
}

export default PageUserService;
