import { User, UserRole } from '@prisma/client';
import { Request, Response } from 'express';
import { signUserData } from './signUserData';
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  token: string;
  score: number;
}
export function transformUserToResponse(
  req: Request,
  res: Response<UserResponse, User & { role: UserRole }>
) {
  const user = res.locals;
  const token = signUserData({
    id: user.id,
    email: user.email,
    role: user.role.role ?? 0,
  });
  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    score: Number(user.score),
    token: token,
  });
}
