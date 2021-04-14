import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeUgsRegistrationsRepository from '../repositories/fakes/FakeUgsRegistrationsRepository';
import UpdateUgRegistrationService from './UpdateUgRegistrationService';

let fakeUgsRegistrationsRepository: FakeUgsRegistrationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateUgRegistrationService: UpdateUgRegistrationService;

describe('UpdateUgRegistration', () => {
  beforeEach(() => {
    fakeUgsRegistrationsRepository = new FakeUgsRegistrationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    updateUgRegistrationService = new UpdateUgRegistrationService(
      fakeUgsRegistrationsRepository,
    );
  });

  it('should be able update the ug registration', async () => {
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
      cnpj: '11.111.111/1111-11',
      code: '1111',
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
          from: 'from',
        },
      ],
    });

    const updatedUgRegistration = await updateUgRegistrationService.execute({
      id: ugRegistration.id,
      status: 'APROVADO',
      status_justification: 'APROVADO PARA SIGAP',
      user,
    });

    expect(updatedUgRegistration.status).toEqual('APROVADO');
  });

  it('should not be able update a non-existing ug registration', async () => {
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
      updateUgRegistrationService.execute({
        id: 1111,
        status: 'APROVADO',
        status_justification: 'APROVADO PARA SIGAP',
        user,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the ug registration ug not authorized for user', async () => {
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
      cnpj: '11.111.111/1111-11',
      code: '11111',
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
      user_id: 2,
      ug_id: 2,
      files: [
        {
          name: 'file-name',
          original_name: 'original-name',
          content_type: 'content-type',
          size: 10,
          from: 'ordinator',
        },
      ],
    });

    await expect(
      updateUgRegistrationService.execute({
        id: ugRegistration.id,
        status: 'APROVADO',
        status_justification: 'APROVADO PARA SIGAP',
        user,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an approved or disapproved ug register', async () => {
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
      cnpj: '11.111.111/1111-11',
      code: '1111',
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
          from: 'from',
        },
      ],
    });

    await updateUgRegistrationService.execute({
      id: ugRegistration.id,
      status: 'APROVADO',
      status_justification: 'APROVADO PARA SIGAP',
      user,
    });

    await expect(updateUgRegistrationService.execute({
      id: ugRegistration.id,
      status: 'APROVADO',
      status_justification: 'APROVADO PARA SIGAP',
      user,
    })).rejects.toBeInstanceOf(AppError);
  })
});
