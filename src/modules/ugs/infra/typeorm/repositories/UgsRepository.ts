import { getRepository, Repository } from 'typeorm';

import IUgsRepository from '@modules/ugs/repositories/IUgsRepository';

import Ug from '../entities/Ug';

class UgsRepository implements IUgsRepository {
  private ormRepository: Repository<Ug>;

  constructor() {
    this.ormRepository = getRepository(Ug);
  }

  public async findAll(): Promise<Ug[]> {
    const ugs = await this.ormRepository.find({
      order: {
        code: 'ASC'
      },
    });

    return ugs;
  }
}

export default UgsRepository;
