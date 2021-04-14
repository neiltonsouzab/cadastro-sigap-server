import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import FakeUgsRegistrationsRepository from "../repositories/fakes/FakeUgsRegistrationsRepository";
import ShowUgRegistrationService from "./ShowUgRegistrationService";

let fakeUgsRegistrationsRepository: FakeUgsRegistrationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let showUgRegistrationService: ShowUgRegistrationService;

describe('ShowUgRegistration', () => {
  beforeEach(() => {
    fakeUgsRegistrationsRepository = new FakeUgsRegistrationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    showUgRegistrationService = 
      new ShowUgRegistrationService(fakeUgsRegistrationsRepository);
  });

  it('should be able show a ug registration', async () => {
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

    const { id } = await fakeUgsRegistrationsRepository.create({
      code:  '1111',
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
          from: 'type',
        },
      ],
    });

    const ugRegistration = await showUgRegistrationService.execute({ id, user });

    expect(ugRegistration).toHaveProperty('id');
  })

  it('should not be able to show non-existent ug registration', async () => {
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
      showUgRegistrationService.execute({ id: 10, user })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to show ug registration for ug not authorized', async () => {
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
    
    const { id } = await fakeUgsRegistrationsRepository.create({
      code:  '1111',
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
      user_id: 10,
      ug_id: 3,
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

    await expect(showUgRegistrationService.execute({
      id,
      user
    })).rejects.toBeInstanceOf(AppError);
  })
});