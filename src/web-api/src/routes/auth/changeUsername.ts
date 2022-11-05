import { NextFunction, Request, Response } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { decode } from 'jsonwebtoken';
import prisma from 'prisma';
import { DecodedJwt, extractToken } from 'shared';

function validate(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) res.status(401);
  if (!req.body.username) res.status(400).send({ message: 'Invalid payload.' });
  next();
}

const changeUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req) as string;
  const decodedToken = DecodedJwt.decode(decode(token));
  const newUsername: string = req.body.username;
  if (isRight(decodedToken)) {
    try {
      const { email } = decodedToken.right;
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
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send({ message: 'Failed to decode token' });
  }
};
export const changeUsernameEndpoint = [validate, changeUsername];