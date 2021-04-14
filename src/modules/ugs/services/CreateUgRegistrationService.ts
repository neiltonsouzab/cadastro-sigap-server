import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import UgRegistration from '../infra/typeorm/entities/UgRegistration';
import IUgsRegistrationsRepository from '../repositories/IUgsRegistrationsRepository';

interface IRequest {
  code: string;
  cnpj: string;
  name: string;
  fantasy_name: string;
  address: string;
  number: string;
  district: string;
  cep: string;
  complement?: string;
  email: string;
  phone: string;
  site: string;
  short_name: string;
  open_date: Date;
  legal_nature_code: string;
  obs?: string;
  type: string;
  expense_ordinator_cpf: string;
  expense_ordinator_name: string;
  expense_ordinator_email: string;
  user: User;
  ug_id: number;
  files: Array<{
    name: string;
    original_name: string;
    content_type: string;
    size: number;
    from: string;
  }>;
}

@injectable()
class CreateUgRegistrationService {
  constructor(
    @inject('UgsRegistrationsRepository')
    private ugsRegistrationsRepository: IUgsRegistrationsRepository,
  ) {}

  public async execute({
    code,
    cnpj,
    name,
    fantasy_name,
    address,
    number,
    district,
    cep,
    complement,
    email,
    phone,
    site,
    short_name,
    open_date,
    legal_nature_code,
    obs,
    type,
    expense_ordinator_cpf,
    expense_ordinator_email,
    expense_ordinator_name,
    user,
    ug_id,
    files,
  }: IRequest): Promise<UgRegistration> {
    const userAuthorizedUg = user.ugs.find(ug => ug.id == ug_id);

    if (!userAuthorizedUg) {
      throw new AppError('Usuário não tem autorização para esta UG.', 403);
    }

    const ugRegistrationAprroved = await this.ugsRegistrationsRepository.findByUgAndStatus(
      ug_id,
      'APROVADO',
    );

    if (ugRegistrationAprroved) {
      throw new AppError('UG já possui registro aprovado.');
    }

    const ugRegistrationAnalized = await this.ugsRegistrationsRepository.findByUgAndStatus(
      ug_id,
      'ANALISE',
    );

    if (ugRegistrationAnalized) {
      throw new AppError('UG já possui registro em análise.');
    }

    const ugRegistration = await this.ugsRegistrationsRepository.create({
      code,
      cnpj,
      name,
      fantasy_name,
      address,
      number,
      district,
      cep,
      complement,
      email,
      phone,
      site,
      short_name,
      open_date,
      legal_nature_code,
      obs,
      type,
      expense_ordinator_cpf,
      expense_ordinator_email,
      expense_ordinator_name,
      user_id: user.id,
      ug_id,
      files,
    });

    return ugRegistration;
  }
}

export default CreateUgRegistrationService;
