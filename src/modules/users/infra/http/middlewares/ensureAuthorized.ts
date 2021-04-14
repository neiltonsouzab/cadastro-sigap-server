import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function ensureAuthorized(authorized: string[]) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { user } = request;

    const isAutorized = authorized.includes(user.type);

    if (!isAutorized) {
      throw new AppError('Usuário não autorizado.', 403);
    }

    return next();
  };
}
