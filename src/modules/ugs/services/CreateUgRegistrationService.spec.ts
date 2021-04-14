import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeUgsRegistrationsRepository from '../repositories/fakes/FakeUgsRegistrationsRepository';
import CreateUgRegistrationService from './CreateUgRegistrationService';

let fakeUgsRegistrationsRepository: FakeUgsRegistrationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUgRegistrationService: CreateUgRegistrationService;

describe('CreateUgRegistration', () => {
  beforeEach(() => {
    fakeUgsRegistrationsRepository = new FakeUgsRegistrationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createUgRegistrationService = new CreateUgRegistrationService(
      fakeUgsRegistrationsRepository,
    );
  });

  it('should be able to create a new ug registration', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'CONTADOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    const ugRegistration = await createUgRegistrationService.execute({
      code: '1111',
      cnpj: '11.111.111/1111-11',
      name: 'Name',
      fantasy_name: 'FantasyName',
      address: 'Address',
      number: 'Number',
      district: 'District',
      cep: 'Cep',
      complement: 'Complement',
      email: 'Email',
      phone: 'Phone',
      site: 'Site',
      short_name: 'ShortName',
      open_date: new Date(),
      legal_nature_code: 'LegalNatureCode',
      obs: 'Obs',
      type: 'Type',
      expense_ordinator_cpf: '111.111.111-11',
      expense_ordinator_name: 'OrdinatorName',
      expense_ordinator_email: 'OrdinatorEmail',
      user,
      ug_id: 1,
      files: [
        {
          name: 'file-name',
          original_name: 'original-name',
          content_type: 'content-type',
          size: 10,
          from: 'type',
        },
      ],
    });

    expect(ugRegistration).toHaveProperty('id');
  });

  it('should not be able to create a new ug registration for ug not authorized', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'CONTADOR',
      ugs: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    });

    await expect(
      createUgRegistrationService.execute({
        code: '1111',
        cnpj: '11.111.111/1111-11',
        name: 'Name',
        fantasy_name: 'FantasyName',
        address: 'Address',
        number: 'Number',
        district: 'District',
        cep: 'Cep',
        complement: 'Complement',
        email: 'Email',
        phone: 'Phone',
        site: 'Site',
        short_name: 'ShortName',
        open_date: new Date(),
        legal_nature_code: 'LegalNatureCode',
        obs: 'Obs',
        type: 'Type',
        expense_ordinator_cpf: '111.111.111-11',
        expense_ordinator_name: 'OrdinatorName',
        expense_ordinator_email: 'OrdinatorEmail',
        user,
        ug_id: 5,
        files: [
          {
            name: 'file-name',
            original_name: 'original-name',
            content_type: 'content-type',
            size: 10,
            from: 'type',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new ug registration if already approved status', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'CONTADOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    const ugRegistration = await fakeUgsRegistrationsRepository.create({
      code: '1111',
      cnpj: '11.111.111/1111-11',
      name: 'Name',
      fantasy_name: 'FantasyName',
      address: 'Address',
      number: 'Number',
      district: 'District',
      cep: 'Cep',
      complement: 'Complement',
      email: 'Email',
      phone: 'Phone',
      site: 'Site',
      short_name: 'ShortName',
      open_date: new Date(),
      legal_nature_code: 'LegalNatureCode',
      obs: 'Obs',
      type: 'Type',
      expense_ordinator_cpf: '111.111.111-11',
      expense_ordinator_name: 'OrdinatorName',
      expense_ordinator_email: 'OrdinatorEmail',
      user_id: 1,
      ug_id: 1,
      files: [
        {
          name: 'file-name',
          original_name: 'original-name',
          content_type: 'content-type',
          size: 10,
          from: 'type',
        },
      ],
    });

    ugRegistration.status = 'APROVADO';

    await fakeUgsRegistrationsRepository.save(ugRegistration);

    await expect(
      createUgRegistrationService.execute({
        code: '1111',
        cnpj: '11.111.111/1111-11',
        name: 'Name',
        fantasy_name: 'FantasyName',
        address: 'Address',
        number: 'Number',
        district: 'District',
        cep: 'Cep',
        complement: 'Complement',
        email: 'Email',
        phone: 'Phone',
        site: 'Site',
        short_name: 'ShortName',
        open_date: new Date(),
        legal_nature_code: 'LegalNatureCode',
        obs: 'Obs',
        type: 'Type',
        expense_ordinator_cpf: '111.111.111-11',
        expense_ordinator_name: 'OrdinatorName',
        expense_ordinator_email: 'OrdinatorEmail',
        user,
        ug_id: 1,
        files: [
          {
            name: 'file-name',
            original_name: 'original-name',
            content_type: 'content-type',
            size: 10,
            from: 'type',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new ug registration if already analize status', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'CONTADOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    await fakeUgsRegistrationsRepository.create({
      code: '1111',
      cnpj: '11.111.111/1111-11',
      name: 'Name',
      fantasy_name: 'FantasyName',
      address: 'Address',
      number: 'Number',
      district: 'District',
      cep: 'Cep',
      complement: 'Complement',
      email: 'Email',
      phone: 'Phone',
      site: 'Site',
      short_name: 'ShortName',
      open_date: new Date(),
      legal_nature_code: 'LegalNatureCode',
      obs: 'Obs',
      type: 'Type',
      expense_ordinator_cpf: '111.111.111-11',
      expense_ordinator_name: 'OrdinatorName',
      expense_ordinator_email: 'OrdinatorEmail',
      user_id: 1,
      ug_id: 1,
      files: [
        {
          name: 'file-name',
          original_name: 'original-name',
          content_type: 'content-type',
          size: 10,
          from: 'type',
        },
      ],
    });

    await expect(
      createUgRegistrationService.execute({
        code: '1111',
        cnpj: '11.111.111/1111-11',
        name: 'Name',
        fantasy_name: 'FantasyName',
        address: 'Address',
        number: 'Number',
        district: 'District',
        cep: 'Cep',
        complement: 'Complement',
        email: 'Email',
        phone: 'Phone',
        site: 'Site',
        short_name: 'ShortName',
        open_date: new Date(),
        legal_nature_code: 'LegalNatureCode',
        obs: 'Obs',
        type: 'Type',
        expense_ordinator_cpf: '111.111.111-11',
        expense_ordinator_name: 'OrdinatorName',
        expense_ordinator_email: 'OrdinatorEmail',
        user,
        ug_id: 1,
        files: [
          {
            name: 'file-name',
            original_name: 'original-name',
            content_type: 'content-type',
            size: 10,
            from: 'type',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
