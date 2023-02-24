import { Request, Response } from 'express';
import prisma from 'prisma';

export async function readiness(req: Request, res: Response) {
  try {
    await prisma.user.count();
    const calcOddsUrl = process.env['CALC_ODDS_URL'] ?? '';
    if (calcOddsUrl === '') {
      throw new Error('3301: calc odds url not set');
    }
    res.send('Readiness check passed');
  } catch (e) {
    res.status(500);
  }
}
