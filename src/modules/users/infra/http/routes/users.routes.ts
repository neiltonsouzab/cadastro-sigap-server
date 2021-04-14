import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/users/infra/http/middlewares/ensureAuthorized';

import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();

const usersValidation = celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().required().messages({"any.required": 'CPF obrigatório.'}),
    name: Joi.string().required().messages({"any.required": 'Nome obrigatório.'}),
    nickname: Joi.string().required().messages({"any.required": 'Apelido obrigatório.'}),
    email: Joi.string().email().required().messages({"any.required": 'Email obrigatório.', 'any.email': 'Email inválido.'}),
    type: Joi.string().required().messages({"any.required": 'Tipo obrigatório.'}),
    ugs: Joi.array().items(
      Joi.object({
        id: Joi.number().required(),
      }),
    ).min(1).message('Infome ao menos 1 (uma) unidade gestora.'),
    blocked: Joi.bool(),
  },
});

usersRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR']),
  usersController.index,
);

usersRoutes.get('/:id', ensureAuthenticated, ensureAuthorized(['ADMINISTRATOR']), usersController.show);

usersRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR']),
  usersValidation,
  usersController.create,
);
usersRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR']),
  usersValidation,
  usersController.update,
);

export default usersRoutes;
