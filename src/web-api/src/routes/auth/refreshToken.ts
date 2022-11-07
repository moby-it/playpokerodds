import { User, UserRole } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { extractUserDataFromRequest, transformUserToResponse } from './common';

async function refreshToken(
  req: Request,
  res: Response<unknown, User & { role: UserRole | null }>,
  next: NextFunction
) {
  const userData = extractUserDataFromRequest(req);
  if (!userData) {
    res.status(401).send('Session expired');
    return;
  }
  const user = await prisma.user.findFirst({
    where: { id: userData.userId },
    include: { role: true },
  });
  if (!user) {
    res.status(401).send('User not Found');
    return;
  }
  res.locals = user;
  next();
}
export const refreshTokenEndpoint = [refreshToken, transformUserToResponse];
