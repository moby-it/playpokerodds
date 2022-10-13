import { Application } from 'express';
import { AuthRouter } from './auth';
import { PokerRouter } from './poker';
export { AuthRouter, PokerRouter };

export function registerAppRoutes(app: Application) {
  app.use('/auth', AuthRouter);
  app.use('/poker', PokerRouter);
}
