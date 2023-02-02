import { Request, Response } from 'express';

export async function liveness(req: Request, res: Response) {
  try {
    res.send('liveness check passed');
  } catch (e) {
    res.status(500);
  }
}
