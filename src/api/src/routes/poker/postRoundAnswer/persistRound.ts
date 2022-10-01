import { RoundAnswerDto } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { decode } from 'jsonwebtoken';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';
export const pesistRound = async (
  req: Request,
  res: Response<unknown, { dto: RoundAnswerDto; score: number; odds: number }>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const dto = res.locals.dto;
  let round = await createRoundModel(dto, res.locals.odds);
  if (authHeader) {
    const token = authHeader.substring(7, authHeader.length);
    const decodedToken = DecodedJwt.decode(decode(token, {}));
    if (isRight(decodedToken)) {
      const _id = decodedToken.right.userId;
      round = await createRoundModel(dto, res.locals.odds, _id);
    } else {
      return res.status(401).send('Invalid token');
    }
  }
  next();
};

async function createRoundModel(
  dto: RoundAnswerDto,
  odds: number,
  _id?: string
) {
  return await prisma.round.create({
    data: {
      myHand: dto.myHand,
      opponentsHands: dto.opponentsHands,
      board: dto.board,
      odds: odds,
      estimate: dto.estimate,
      userId: _id,
    },
  });
}
