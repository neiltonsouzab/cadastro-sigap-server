import { getRepository, Like, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPaginator from '@shared/models/IPaginator';
import IPage from '@shared/models/IPage';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async find({
    page,
    perPage,
    filter,
  }: IPaginator<string>): Promise<IPage<User>> {
    const skip = page * perPage - perPage;
    const take = perPage;

    const query = this.ormRepository.createQueryBuilder();

    if (filter) {
      query.where([
        { name: Like(`%${filter}%`) },
        { cpf: Like(`%${filter}%`) },
      ])
    }

    const count = await query.getCount();
    const pages = Math.ceil(count / perPage);

    query.take(take);
    query.skip(skip);

    const data = await query.getMany();

    return {
      page: Number(page),
      pages,
      perPage: Number(perPage),
      count,
      data,
    };
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['ugs']
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
      relations: ['ugs'],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    cpf,
    name,
    nickname,
    email,
    type,
    ugs,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      cpf,
      name,
      nickname,
      email,
      type,
      ugs,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
