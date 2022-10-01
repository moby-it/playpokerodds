import { Request } from 'express';
export function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return authHeader.substring(7, authHeader.length);
}
