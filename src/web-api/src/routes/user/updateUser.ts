import { User } from '@prisma/client';
import { genSalt, hash as hashPassword } from 'bcrypt';
import { Request, Response } from 'express';
import Joi from 'joi';
import prisma from 'prisma';
import { extractUserDataFromRequest } from '../auth/common';

const UpdatUserSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string().allow(''),
  email: Joi.string().email(),
}).or('username', 'email', 'password');

interface UpdateUserDto {
  username: string;
  password: string;
  email: string;
}

async function updateUser(req: Request, res: Response) {
  const userData = extractUserDataFromRequest(req);
  if (!userData) {
    res.sendStatus(401);
    return;
  }
  const userPayload: Partial<UpdateUserDto> = req.body;
  const { error } = UpdatUserSchema.validate(userPayload);
  if (error) {
    res.status(400).send({ error });
    return;
  }
  const updatedUser: Partial<User> = {
    username: userPayload.username,
    email: userPayload.email,
  };
  if (userPayload.password) {
    const salt = await genSalt(10);
    const hash = await hashPassword(userPayload.password, salt);
    updatedUser.salt = salt;
    updatedUser.hash = hash;
  }
  await prisma.user.update({
    data: { ...updatedUser },
    where: { id: userData?.userId },
  });
  res.send(204);
}
export const updateUserEndpoint = [updateUser];
