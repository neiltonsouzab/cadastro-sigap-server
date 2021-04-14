import ICreateUgRegistrationDTO from '@modules/ugs/dtos/ICreateUgRegistrationDTO';
import UgRegistration from '@modules/ugs/infra/typeorm/entities/UgRegistration';
import IPage from '@shared/models/IPage';
import IPaginator from '@shared/models/IPaginator';
import IUgsRegistrationsRepository from '../IUgsRegistrationsRepository';

class FakeUgsRegistrationsRepository implements IUgsRegistrationsRepository {
  private ugsRegistrations: UgRegistration[] = [];

  public async findById(id: number): Promise<UgRegistration | undefined> {
    const ugRegistration = this.ugsRegistrations.find(
      findUgRegistration => findUgRegistration.id === id,
    );

    return ugRegistration;
  }

  public async findByUgAndStatus(
    ug_id: number,
    status: string,
  ): Promise<UgRegistration | undefined> {
    const ugRegistration = this.ugsRegistrations.find(
      findUgRegistration =>
        findUgRegistration.ug_id === ug_id &&
        findUgRegistration.status === status,
    );

    return ugRegistration;
  }

  public async findByUgs({ page, perPage, filter }: IPaginator<number[]>): Promise<IPage<UgRegistration>> {
    const skip = page * perPage - perPage;
    const take = perPage;

    let data = this.ugsRegistrations;

    if (filter) {
      data = this.ugsRegistrations.filter(
        findUgRegistration => filter.includes(findUgRegistration.id),
      );
    }

    const count = data.length;
    const pages= Math.ceil(count / perPage);

    data = data.slice(skip, take);

    return {
      page,
      pages,
      perPage,
      count,
      data,
    };
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
    const ugRegistration = new UgRegistration();

    Object.assign(ugRegistration, {
      id: this.ugsRegistrations.length + 1,
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
      status: 'ANALISE',
      expense_ordinator_cpf,
      expense_ordinator_name,
      expense_ordinator_email,
      user_id,
      ug_id,
      files,
    });

    this.ugsRegistrations.push(ugRegistration);

    return ugRegistration;
  }

  public async save(ugRegistration: UgRegistration): Promise<UgRegistration> {
    const index = this.ugsRegistrations.findIndex(
      findUgRegistration => findUgRegistration.id === ugRegistration.id,
    );

    this.ugsRegistrations[index] = ugRegistration;

    return ugRegistration;
  }
}

export default FakeUgsRegistrationsRepository;
