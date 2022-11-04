import { genSalt, hash as hashPassword } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { EventType } from 'shared';
import { transformUserToResponse, validateAuthPayload } from './common';

const registerUser = async (
  req: Request<
    unknown,
    unknown,
    { email: string; password: string; username: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    const salt = await genSalt(10);
    const hash = await hashPassword(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        salt,
        hash,
      },
    });
    await prisma.event.create({
      data: {
        type: EventType.USER_REGISTERED,
        payload: { email: user.email, username: user.username },
      },
    });
    res.locals = user;
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};
export const registerEntpoint = [
  validateAuthPayload,
  registerUser,
  transformUserToResponse,
];
