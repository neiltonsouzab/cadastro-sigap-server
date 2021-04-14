import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserService = new UpdateUserService(fakeUsersRepository);
  });

  it('should be ble update the user', async () => {
    const user = await fakeUsersRepository.create({
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

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'Doe',
      email: 'johndoe@example.com',
      type: 'ADMINISTRATOR',
      blocked: false,
      ugs: [
        {
          id: 1,
        },
      ],
    });

    expect(updatedUser.nickname).toEqual('Doe');
  });

  it('should not be able update a non-existing user', async () => {
    await expect(
      updateUserService.execute({
        user_id: 1111,
        cpf: '111.111.111-11',
        name: 'John Doe',
        nickname: 'Doe',
        email: 'johndoe@example.com',
        type: 'ADMINISTRATOR',
        blocked: false,
        ugs: [
          {
            id: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update user with same cpf from another', async () => {
    await fakeUsersRepository.create({
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

    const user = await fakeUsersRepository.create({
      cpf: '222.222.222-22',
      name: 'Mary Jane',
      nickname: 'Mary',
      email: 'jane@example.com',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        cpf: '111.111.111-11',
        name: 'Mary Jane',
        nickname: 'Mary',
        email: 'jane@example.com',
        type: 'ADMINISTRATOR',
        blocked: false,
        ugs: [
          {
            id: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update user with same email from another', async () => {
    await fakeUsersRepository.create({
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

    const user = await fakeUsersRepository.create({
      cpf: '222.222.222-22',
      name: 'Mary Jane',
      nickname: 'Mary',
      email: 'jane@example.com',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    await expect(
      updateUserService.execute({
        user_id: user.id,
        cpf: '222.222.222-22',
        name: 'Mary Jane',
        nickname: 'Mary',
        email: 'johndoe@example.com',
        type: 'ADMINISTRATOR',
        blocked: false,
        ugs: [
          {
            id: 1,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
