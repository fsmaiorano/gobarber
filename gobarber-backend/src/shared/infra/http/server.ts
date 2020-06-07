import 'reflect-metadata';
import 'dotenv/config';
import express, { json, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middlewares/RateLimiter';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

// Global Handler Exceptions
app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('💻 Server started on port 3333');
});
