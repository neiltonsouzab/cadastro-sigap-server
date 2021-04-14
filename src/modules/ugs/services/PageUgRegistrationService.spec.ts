import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeUgsRegistrationsRepository from '../repositories/fakes/FakeUgsRegistrationsRepository';
import PageUgRegistrationService from './PageUgRegistrationService';

let fakeUgsRegistrationsRepository: FakeUgsRegistrationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let pageUgRegistrationService: PageUgRegistrationService;

describe('ListUgRegistration', () => {
  beforeEach(() => {
    fakeUgsRegistrationsRepository = new FakeUgsRegistrationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    pageUgRegistrationService = new PageUgRegistrationService(
      fakeUgsRegistrationsRepository,
    );
  });

  it('should be able list ug registrations', async () => {
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
      user_id: user.id,
      ug_id: 1,
      files: [
        {
          name: 'file-name',
          original_name: 'original-name',
          content_type: 'content-type',
          size: 10,
          type: 'type',
        },
      ],
    });

    const ugsRegistrationsPage = await pageUgRegistrationService.execute({
      page: 1,
      perPage: 10,
      filter: [1],
      user,
    });

    expect(ugsRegistrationsPage.pages).toEqual(1);
    expect(ugsRegistrationsPage.data).toHaveLength(2);
  });

  it('should not be able list ug registration in ug not authorized for user', async () => {
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

    await expect(
      pageUgRegistrationService.execute({
        page: 1,
        perPage: 10,
        filter: [2],
        user,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
