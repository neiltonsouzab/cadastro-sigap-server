import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/users/infra/http/middlewares/ensureAuthorized';
import UgsRegistrationsController from '../controllers/UgsRegistrationsController';

const ugsRegistrationsRoutes = Router();
const upload = multer(uploadConfig);
const ugsRegistrationsController = new UgsRegistrationsController();

ugsRegistrationsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR', 'ACCOUNTANT', 'OPERATOR']),
  ugsRegistrationsController.index,
);

ugsRegistrationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR', 'ACCOUNTANT', 'OPERATOR']),
  upload.fields([{ name: 'file1', maxCount: 2 }, { name: 'file2', maxCount: 2 }]),
  ugsRegistrationsController.create,
);

ugsRegistrationsRoutes.put(
    '/:id', 
    ensureAuthenticated, 
    ensureAuthorized(['ADMINISTRATOR', 'OPERATOR']),
    ugsRegistrationsController.update,
  );

ugsRegistrationsRoutes.get(
  '/:id', 
  ensureAuthenticated, 
  ugsRegistrationsController.show);

export default ugsRegistrationsRoutes;
