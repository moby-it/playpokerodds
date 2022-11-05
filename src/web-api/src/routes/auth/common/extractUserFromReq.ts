import { Request } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import { decode } from 'jsonwebtoken';
import { DecodedJwt } from 'shared';

export const extractUserDataFromRequest = (req: Request): DecodedJwt | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.substring(7, authHeader.length);
  const decodedToken = DecodedJwt.decode(decode(token, {}));
  if (isLeft(decodedToken)) return null;
  return decodedToken.right;
};
