import { Router } from 'express';

import UgsController from '../controllers/UgsController';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'

const ugsRoutes = Router();
const ugsController = new UgsController();

ugsRoutes.get('/', ensureAuthenticated, ugsController.index);

export default ugsRoutes;
