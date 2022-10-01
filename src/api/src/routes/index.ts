import { Application } from 'express';
import { AuthRouter } from './auth';
import { PokerRouter } from './poker';
import { PostAnswerResponse } from './poker/postRoundAnswer/response';
export { AuthRouter, PokerRouter, PostAnswerResponse };

export function registerAppRoutes(app: Application) {
  app.use('/auth', AuthRouter);
  app.use('/poker', PokerRouter);
}
