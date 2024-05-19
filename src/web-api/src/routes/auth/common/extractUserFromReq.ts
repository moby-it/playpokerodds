import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { DecodedJwt, decodedJwtIsValid } from 'shared';
import { getSecretKey } from './getSecretKey';

export const extractUserDataFromRequest = (req: Request): DecodedJwt | null => {
  const token = extractTokenFromRequest(req);
  if (!token) return null;
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
export function extractTokenFromRequest(req: Request): string | null {
  return req.cookies.token;
}
