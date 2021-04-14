import { getRepository, Repository, In } from 'typeorm';

import IUgsRegistrationsRepository from '@modules/ugs/repositories/IUgsRegistrationsRepository';
import ICreateUgRegistrationDTO from '@modules/ugs/dtos/ICreateUgRegistrationDTO';
import UgRegistration from '../entities/UgRegistration';
import IPaginator from '@shared/models/IPaginator';
import IPage from '@shared/models/IPage';
import Ug from '../entities/Ug';

class UgsRegistrationsRepository implements IUgsRegistrationsRepository {
  private ormRepository: Repository<UgRegistration>;

  constructor() {
    this.ormRepository = getRepository(UgRegistration);
  }

  public async findById(id: number): Promise<UgRegistration | undefined> {
    const ugRegistration = await this.ormRepository.findOne(id, {
      relations: ['ug', 'user', 'files'],
    });

    return ugRegistration;
  }

  public async findByUgAndStatus(
    ug_id: number,
    status: string,
  ): Promise<UgRegistration | undefined> {
    const ugRegistration = await this.ormRepository.findOne({
      where: {
        ug_id,
        status,
      },
    });

    return ugRegistration;
  }

  public async findByUgs({ page, perPage, filter }: IPaginator<number[]>): Promise<IPage<UgRegistration>> {
    const skip = page * perPage - perPage;
    const take = perPage;

    const query = this.ormRepository.createQueryBuilder('UgRegistration');

    if (filter) {
      query.where({
        ug_id: In(filter),
      });
    };

    
    const count = await query.getCount();
    const pages = Math.ceil(count / perPage);

    query.innerJoinAndSelect('UgRegistration.ug', 'ug');
    query.orderBy('UgRegistration.created_at', 'DESC');

    const data = await query.getMany();
    
    query.take(take);
    query.skip(skip);

    return {
      page: Number(page),
      pages,
      perPage: Number(perPage),
      count,
      data,
    };;
  }

  public async create({
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
    expense_ordinator_name,
    expense_ordinator_email,
    user_id,
    ug_id,
    files,
  }: ICreateUgRegistrationDTO): Promise<UgRegistration> {
    const ugRegistration = this.ormRepository.create({
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
      expense_ordinator_name,
      expense_ordinator_email,
      user_id,
      ug_id,
      files,
    });

    await this.ormRepository.save(ugRegistration);

    return ugRegistration;
  }

  public async save(ugRegistration: UgRegistration): Promise<UgRegistration> {
    return this.ormRepository.save(ugRegistration);
  }
}

export default UgsRegistrationsRepository;
