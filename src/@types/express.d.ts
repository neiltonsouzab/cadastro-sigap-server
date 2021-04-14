import User from '@modules/users/infra/typeorm/entities/User';

declare global {
  namespace Express {
    export interface Request { // eslint-disable-line
      user: User;
      files: {
        file1: Express.Multer.File[];
        file2: Express.Multer.File[];
      };
    }

    namespace Multer {
      export interface File { // eslint-disable-line
        from: string;
      }
    }
  }
}
