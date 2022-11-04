import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { getSecretKey } from './getSecretKey';
interface UserResponse {
  id: string;
  username: string;
  email: string;
  token: string;
  score: number;
}
export function transformUserToResponse(
  req: Request,
  res: Response<UserResponse, User>
) {
  const user = res.locals;
  const token = sign({ userId: user.id, email: user.email }, getSecretKey(), {
    expiresIn: '24h',
  });
  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    score: Number(user.score),
    token: token,
  });
}
