import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import ShowUserService from "./ShowUserService";

let fakeUsersRepository: FakeUsersRepository;
let showUserService: ShowUserService;

describe('ShowUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show user', async () => {
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

    const userShow = await showUserService.execute({ id: user.id });

    expect(userShow.name).toEqual(user.name);
  });

  it('should not be able to show non-existent user', async () => {
    await expect(showUserService.execute({ id: 1 }))
      .rejects.toBeInstanceOf(AppError);
  });
});