import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same cpf from another', async () => {
    await createUserService.execute({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    await expect(
      createUserService.execute({
        cpf: '111.111.111-11',
        name: 'Jane Mary',
        nickname: 'Jane',
        email: 'jane@example.com',
        type: 'ADMINISTRATOR',
        ugs: [
          {
            id: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    await expect(
      createUserService.execute({
        cpf: '222.222.222-22',
        name: 'Jane Mary',
        nickname: 'Jane',
        email: 'johndoe@example.com',
        type: 'ADMINISTRATOR',
        ugs: [
          {
            id: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a confirm account token', async () => {
    const createToken = jest.spyOn(fakeUsersTokensRepository, 'create');

    const user = await createUserService.execute({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    expect(createToken).toHaveBeenCalledWith(user.id);
  });
});
