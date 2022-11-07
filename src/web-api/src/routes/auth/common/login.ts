import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const loginUser = async (
  req: Request,
  res: Response<unknown, User>,
  next: NextFunction
) => {
  passport.authenticate('local', async (err: Error, user: User, info) => {
    if (!user) {
      res.status(401).json({ success: false, message: err.message });
    } else {
      res.locals = user;
      next();
    }
  })(req, res);
};
