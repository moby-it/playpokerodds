import { NextFunction, Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { NewAnswerDto } from './newAnswer.dto';

export const validatePayload = (
  req: Request,
  res: Response<unknown, { dto: NewAnswerDto }>,
  next: NextFunction
) => {
  const dto = NewAnswerDto.decode(req.body);
  if (isLeft(dto)) {
    res.status(400).send({ error: PathReporter.report(dto) });
  } else {
    res.locals.dto = dto.right;
    next();
  }
};