import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { AuthRouter, PokerRouter } from 'routes';
import request from 'supertest';
import {
  ExistingRoundPayloads,
  mockUserPayload1,
  mockUserPayload2,
  NewRoundPayloads,
} from '../fixtures';
import { mockDb } from '../helpers';
describe('test leaderboards', () => {
  let app: Application;
  const tokens: string[] = [];
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(AuthRouter);
    app.use(PokerRouter);
    registerErrorHandlers(app);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });

  it('should create 2 users', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(response => {
        expect('token' in response.body).toBeTruthy();
        tokens.push(response.body.token);
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload2)
      .expect(200)
      .expect(response => {
        expect('token' in response.body).toBeTruthy();
        tokens.push(response.body.token);
      });
    expect(await prisma.user.count()).toEqual(2);
  });

  it('should play a some rounds', async () => {
    let roundId = '';
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload2)
      .auth(tokens[0], { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect(response.body.id).toBeDefined();
        roundId = response.body.id;
      });
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload1)
      .auth(tokens[1], { type: 'bearer' })
      .expect(200);
    await request(app)
      .post('/postExistingRoundAnswer')
      .send({ ...ExistingRoundPayloads.postValidRoundPayload1, roundId })
      .auth(tokens[1], { type: 'bearer' })
      .expect(200);
    const roundAnswers = await prisma.roundAnswer.findMany();
    expect(roundAnswers.length).toEqual(3);
  });
  it('should have 1 user on the leaderboards', async () => {
    await request(app)
      .get('/fetchLeaderboards')
      .expect(200)
      .expect(response => {
        expect(response.body.length).toEqual(1);
      });
  });
});
