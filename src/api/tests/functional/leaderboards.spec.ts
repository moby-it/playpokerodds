import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMiddleware } from 'middleware';
import { prisma } from '@infrastructure';
import { AuthRouter, PokerRouter } from 'src/application/routes';
import {
  mockUserPayload1,
  mockUserPayload2,
  mockUserPayload3,
  mockUserPayload4,
} from '../fixtures';
import { mockDb } from '../helpers';
import request from 'supertest';
describe('test leaderboards', () => {
  let app: Application;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(AuthRouter);
    app.use(PokerRouter);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should create four users', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(body => {
        expect(body).toBeDefined();
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload2)
      .expect(200)
      .expect(body => {
        expect(body).toBeDefined();
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload3)
      .expect(200)
      .expect(body => {
        expect(body).toBeDefined();
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload4)
      .expect(200)
      .expect(body => {
        expect(body).toBeDefined();
      });
    expect(await prisma.user.count()).toEqual(4);
  });
});
