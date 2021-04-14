import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import UgRegistration from "../infra/typeorm/entities/UgRegistration";
import IUgsRegistrationsRepository from "../repositories/IUgsRegistrationsRepository";

interface IRequest {
  id: number;
  user: User;
}

@injectable()
class ShowUgRegistrationService {

  constructor (
    @inject('UgsRegistrationsRepository')
    private ugsRegistrationsRepository: IUgsRegistrationsRepository
  ) {};

  public async execute({ id, user }: IRequest): Promise<UgRegistration> {
    const ugRegistration = await this.ugsRegistrationsRepository.findById(id);

    if (!ugRegistration) {
      throw new AppError('Ug Registration not found.', 404);
    }
    
    const userAuthorizedUg = user.ugs.find(ug => ug.id == ugRegistration.ug_id);

    if (!userAuthorizedUg) {
      throw new AppError('User not authorized for this ug.', 403);
    }

    return ugRegistration;
  }
}

export default ShowUgRegistrationService;