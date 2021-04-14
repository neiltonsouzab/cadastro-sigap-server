import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import UgRegistration from '../infra/typeorm/entities/UgRegistration';
import IUgsRegistrationsRepository from '../repositories/IUgsRegistrationsRepository';

interface IRequest {
  id: number;
  status: string;
  status_justification: string;
  user: User;
}

@injectable()
class UpdateUgRegistrationService {
  constructor(
    @inject('UgsRegistrationsRepository')
    private ugsRegistrationsRepository: IUgsRegistrationsRepository,
  ) {}

  public async execute({
    id,
    user,
    status,
    status_justification,
  }: IRequest): Promise<UgRegistration> {
    const ugRegistration = await this.ugsRegistrationsRepository.findById(
      id,
    );

    if (!ugRegistration) {
      throw new AppError('Registro de UG não encontrado.', 404);
    }

    const userAuthorizedUg = user.ugs.find(
      ug => ug.id === ugRegistration.ug_id,
    );

    if (!userAuthorizedUg) {
      throw new AppError('Usuário não tem autorização para esta UG.', 403);
    }

    if (ugRegistration.status !== 'ANALISE') {
      throw new AppError(`Só é possível ${status} um registro que esteja em ANALISE.`);
    }

    ugRegistration.user_update_id = user.id;
    ugRegistration.status = status;
    ugRegistration.status_justification = status_justification;

    await this.ugsRegistrationsRepository.save(ugRegistration);

    return ugRegistration;
  }
}

export default UpdateUgRegistrationService;
