import { Request, Response } from 'express';
import prisma from 'prisma';

export async function readiness(req: Request, res: Response) {
  try {
    const _ = await prisma.user.count();
    res.send("Readiness check passed")
  } catch (e) {
    res.status(500);
  }
}
