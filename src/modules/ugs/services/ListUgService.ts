import { inject, injectable } from 'tsyringe';

import Ug from '../infra/typeorm/entities/Ug';
import IUgsRepository from '../repositories/IUgsRepository';

@injectable()
class ListUgService {
  constructor(
    @inject('UgsRepository')
    private ugsRepository: IUgsRepository,
  ) {}

  public async execute(): Promise<Ug[]> {
    const ugs = await this.ugsRepository.findAll();

    return ugs;
  }
}

export default ListUgService;
