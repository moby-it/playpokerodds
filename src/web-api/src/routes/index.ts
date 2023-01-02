import { Application, Request, Response } from 'express';
import { AuthRouter } from './auth';
import { PokerRouter } from './poker';
export { AuthRouter, PokerRouter };
export { RoundAnswerResponse } from './poker';
export function registerAppRoutes(app: Application) {
  app.use('/auth', AuthRouter);
  app.use('/poker', PokerRouter);
  app.use('/health', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}
