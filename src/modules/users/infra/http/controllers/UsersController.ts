import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import PageUserService from '@modules/users/services/PageUserService';
import ShowUserService from '@modules/users/services/ShowUserService';

interface IndexRequestQuery {
  page?: number;
  perPage?: number;
  filter?: string;
}

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, perPage = 10, filter = '' } = request.query as IndexRequestQuery;

    const pageUserService = container.resolve(PageUserService);

    const usersPage = await pageUserService.execute({
      page,
      perPage,
      filter,
    });

    const data = usersPage.data.map(user => classToClass(user));
    usersPage.data = data;

    return response.json(usersPage);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);
    const user = await showUserService.execute({ id: Number(id) });

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, name, nickname, email, type, ugs } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      cpf,
      name,
      nickname,
      email,
      type,
      ugs,
    });

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { cpf, name, nickname, email, type, blocked, ugs } = request.body;
    const { id } = request.params;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id: Number(id),
      cpf,
      name,
      nickname,
      email,
      type,
      blocked,
      ugs,
    });

    return response.json(user);
  }
}
