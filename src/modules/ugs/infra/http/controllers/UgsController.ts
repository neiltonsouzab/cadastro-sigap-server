import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUgService from '@modules/ugs/services/ListUgService';

export default class UgsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUgService = container.resolve(ListUgService);

    const ugs = await listUgService.execute();

    return response.json(ugs);
  }
}
