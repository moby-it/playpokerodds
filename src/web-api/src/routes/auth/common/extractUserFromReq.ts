import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { DecodedJwt, decodedJwtIsValid } from 'shared';
import { getSecretKey } from './getSecretKey';

export const extractUserDataFromRequest = (req: Request): DecodedJwt | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.substring(7, authHeader.length);
  const decodedToken = verifyJwt(token);
  if (!decodedJwtIsValid(decodedToken)) return null;
  return decodedToken;
};
function verifyJwt(token: string): string | JwtPayload | null {
  try {
    return verify(token, getSecretKey());
  } catch (e) {
    return null;
  }
}
