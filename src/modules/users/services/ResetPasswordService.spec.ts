import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;
let updateUserService: UpdateUserService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider,
    );
    updateUserService = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to reset the password', async () => {
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

    const { token } = await fakeUsersTokensRepository.create(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokensRepository.create(1111);

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with blocked user', async () => {
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

    updateUserService.execute({
      ...user,
      user_id: user.id,
      blocked: true,
    });

    const { token } = await fakeUsersTokensRepository.create(user.id);

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 24 hours', async () => {
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

    const { token } = await fakeUsersTokensRepository.create(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 25);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
