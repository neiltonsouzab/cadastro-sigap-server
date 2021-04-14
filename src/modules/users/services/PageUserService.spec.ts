import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import PageUserService from './PageUserService';

let fakeUsersRepository: FakeUsersRepository;
let pageUserService: PageUserService;

describe('ListUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    pageUserService = new PageUserService(fakeUsersRepository);
  });

  it('should be able list user', async () => {
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

    await fakeUsersRepository.create({
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

    const usersPage = await pageUserService.execute({
      page: 1,
      perPage: 10,
    });

    expect(usersPage.pages).toEqual(1);
    expect(usersPage.data).toHaveLength(2);
  });
});
