import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUgRegistrationService from '@modules/ugs/services/CreateUgRegistrationService';
import PageUgRegistrationService from '@modules/ugs/services/PageUgRegistrationService';
import ShowUgRegistrationService from '@modules/ugs/services/ShowUgRegistrationService';
import UpdateUgRegistrationService from '@modules/ugs/services/UpdateUgRegistrationService';


interface IndexQueryParams {
  page?: number;
  perPage?: number;
  filter?: number[];
}

export default class UgsRegistrationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, perPage = 10, filter  } = request.query as IndexQueryParams;

    const pageUgRegistrationService = container.resolve(
      PageUgRegistrationService,
    );

    let ugsIdsFilter = filter || request.user.ugs.map(ug => ug.id);
    
    if (typeof(filter) === 'string') {
      ugsIdsFilter = [filter];
    }

    
    const ugsRegistrations = await pageUgRegistrationService.execute({
      page,
      perPage,
      filter: ugsIdsFilter.map(Number),
      user: request.user,
    });

    return response.json(ugsRegistrations);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      code,
      cnpj,
      name,
      fantasy_name,
      address,
      number,
      district,
      cep,
      complement,
      email,
      phone,
      site,
      short_name,
      open_date,
      legal_nature_code,
      obs,
      type,
      expense_ordinator_cpf,
      expense_ordinator_email,
      expense_ordinator_name,
      ug_id,
    } = request.body;

    const files1 = request.files.file1.map(file => ({
      name: file.filename,
      original_name: file.originalname,
      content_type: file.mimetype,
      size: file.size,
      from: 'ug',
    }));

    const files2 = request.files.file2.map(file => ({
      name: file.filename,
      original_name: file.originalname,
      content_type: file.mimetype,
      size: file.size,
      from: 'ordinator',
    }));

    const files = [...files1, ...files2];

    const createUgRegistrationService = container.resolve(
      CreateUgRegistrationService,
    );

    const ugRegistration = await createUgRegistrationService.execute({
      code,
      cnpj,
      name,
      fantasy_name,
      address,
      number,
      district,
      cep,
      complement,
      email,
      phone,
      site,
      short_name,
      open_date,
      legal_nature_code,
      obs,
      type,
      expense_ordinator_cpf,
      expense_ordinator_email,
      expense_ordinator_name,
      ug_id,
      user: request.user,
      files,
    });

    return response.status(201).json(ugRegistration);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status, status_justification } = request.body;

    const updateUgRegistrationService = container.resolve(UpdateUgRegistrationService);

    const ugRegistration = await updateUgRegistrationService.execute({
      id: Number(id),
      status,
      status_justification,
      user: request.user,
    })

    return response.json(ugRegistration);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUgRegistrationService = container.resolve(ShowUgRegistrationService);

    const ugRegistration = await showUgRegistrationService.execute({
      id: Number(id),
      user: request.user,
    });

    return response.json(classToClass(ugRegistration));
  }
}
