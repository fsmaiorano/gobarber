import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  console.log(authHeader);

  if (!authHeader) {
    throw new AppError('JWT token is missing', 403);
  }

  const token = authHeader.split(' '); // [Bearer,Token]

  try {
    const decoded = verify(token[1], authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    console.info(decoded);
    console.info(request.user);

    next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
