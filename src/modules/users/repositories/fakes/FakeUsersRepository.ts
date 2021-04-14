import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IPage from '@shared/models/IPage';
import IPaginator from '@shared/models/IPaginator';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async find({
    page,
    perPage,
    filter,
  }: IPaginator<string>): Promise<IPage<User>> {
    const skip = page * perPage - perPage;
    const take = perPage;

    let data = this.users;

    if (filter) {
      data = this.users.filter(user =>
        user.name.toLowerCase().includes(filter.toLowerCase()) || user.cpf.includes(filter),
      );
    }

    const count = data.length;
    const pages = Math.ceil(count / perPage);

    data = data.slice(skip, take);

    return {
      page,
      pages,
      perPage,
      count,
      data,
    };
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === id);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.cpf === cpf);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  public async create({
    name,
    nickname,
    cpf,
    email,
    type,
    ugs,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: this.users.length + 1,
      name,
      cpf,
      nickname,
      email,
      type,
      ugs,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[index] = user;

    return user;
  }
}

export default FakeUsersRepository;
