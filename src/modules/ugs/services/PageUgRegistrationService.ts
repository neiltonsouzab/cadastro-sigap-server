import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UgRegistration from '../infra/typeorm/entities/UgRegistration';
import IUgsRegistrationsRepository from '../repositories/IUgsRegistrationsRepository';
import IPage from '@shared/models/IPage';

interface IRequest {
  page: number;
  perPage: number;
  filter: number[];
  user: User;
}

@injectable()
class PageUgRegistrationService {
  constructor(
    @inject('UgsRegistrationsRepository')
    private ugsRegistrationsService: IUgsRegistrationsRepository,
  ) {}

  public async execute({ page, perPage, filter, user }: IRequest): Promise<IPage<UgRegistration>> {
    const userAuthorizedUg = user.ugs.find(ug => filter.includes(ug.id));
    
    if (!userAuthorizedUg) {
      throw new AppError('Usuário sem autorização para esta UG.', 403);
    }

    const ugsRegistrationsPage = await this.ugsRegistrationsService.findByUgs({
      page,
      perPage,
      filter,
    });

    return ugsRegistrationsPage;
  }
}

export default PageUgRegistrationService;
