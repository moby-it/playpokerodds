import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { extractUserDataFromRequest } from './common';

const changeUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = extractUserDataFromRequest(req);
  if (!userData) {
    res.sendStatus(401);
    return;
  }
  const newUsername: string = req.body.username;
  const { email } = userData;
  const user = await prisma.user.update({
    where: { email },
    data: {
      username: newUsername,
    },
  });
  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    score: Number(user.score),
  });
};
export const changeUsernameEndpoint = [changeUsername];
