import { Request } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import { JwtPayload, verify } from 'jsonwebtoken';
import { DecodedJwt } from 'shared';
import { getSecretKey } from './getSecretKey';

export const extractUserDataFromRequest = (req: Request): DecodedJwt | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.substring(7, authHeader.length);
  const decodedToken = DecodedJwt.decode(verifyJwt(token));
  if (isLeft(decodedToken)) return null;
  return decodedToken.right;
};
function verifyJwt(token: string): string | JwtPayload | null {
  try {
    return verify(token, getSecretKey());
  } catch (e) {
    return null;
  }
}
