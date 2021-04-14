import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import ugsRouter from '@modules/ugs/infra/http/routes/ugs.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ugsRegistrationsRouter from '@modules/ugs/infra/http/routes/ugsRegistrations.routes';

const routes = Router();

routes.use('/ugs', ugsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/ugs-registrations', ugsRegistrationsRouter);

export default routes;
