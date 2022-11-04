import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import prisma from 'prisma';
import { EventType } from 'shared';
import { transformUserToResponse, validateAuthPayload } from './common';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async (err: Error, user: User, info) => {
    if (!user) {
      res.status(401).json({ success: false, message: err.message });
    } else {
      await prisma.event.create({
        data: {
          type: EventType.USER_LOGGED_IN,
          payload: { email: user.email },
        },
      });
      res.locals = user;
      next();
    }
  })(req, res);
};
export const loginEndpoint = [
  validateAuthPayload,
  loginUser,
  transformUserToResponse,
];
