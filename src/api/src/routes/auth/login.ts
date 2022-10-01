import { User } from '@prisma/client';
import { EventType } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import prisma from 'prisma';
import { validateAuthPayload, transformUserToResponse } from './helpers';

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
export const login = [validateAuthPayload, loginUser, transformUserToResponse];
