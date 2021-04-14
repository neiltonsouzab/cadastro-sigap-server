import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';

import errors from '../../errors'; // Error interceptor
import routes from './routes'; // Routes

import '@shared/infra/typeorm'; // DB config
import '@shared/container'; // DI config

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', '..', '..', 'uploads')),
);
app.use(routes);
app.use(errors);

app.listen(process.env.APP_API_PORT || 3333, () => {
  console.log('🚀 Server started on port 3333');
});
