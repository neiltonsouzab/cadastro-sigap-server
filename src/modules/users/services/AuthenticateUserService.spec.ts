import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import AuthenticateUserService from './AuthenticateUserService';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUsersTokenRepository: FakeUsersTokensRepository;
let authenticateUserService: AuthenticateUserService;
let resetPasswordService: ResetPasswordService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersTokenRepository = new FakeUsersTokensRepository();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'John',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    const { token } = await fakeUsersTokenRepository.create(user.id);
    await resetPasswordService.execute({
      password: '123456',
      token,
    });

    const response = await authenticateUserService.execute({
      cpf: '111.111.111-11',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        cpf: 'non-existing-user',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'John',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    await expect(
      authenticateUserService.execute({
        cpf: '111.111.111-11',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with user blocked', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'John',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    const { token } = await fakeUsersTokenRepository.create(user.id);

    await resetPasswordService.execute({
      password: '123456',
      token,
    });

    user.blocked = true;

    await fakeUsersRepository.save(user);

    await expect(authenticateUserService.execute({
      cpf: '111.111.111-11',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with user disabled', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'John',
      type: 'ADMINISTRATOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    const { token } = await fakeUsersTokenRepository.create(user.id);

    await resetPasswordService.execute({
      password: '123456',
      token,
    });

    user.enabled = false;

    await fakeUsersRepository.save(user);

    await expect(authenticateUserService.execute({
      cpf: '111.111.111-11',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
