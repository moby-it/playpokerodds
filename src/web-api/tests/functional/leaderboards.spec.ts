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
  mockUserPayload3,
  mockUserPayload4,
  NewRoundPayloads
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

  it('should create four users', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(response => {
        tokens.push();
        expect('token' in response.body).toBeTruthy();
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload2)
      .expect(200)
      .expect(response => {
        tokens.push();
        expect('token' in response.body).toBeTruthy();
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload3)
      .expect(200)
      .expect(response => {
        tokens.push();
        expect('token' in response.body).toBeTruthy();
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload4)
      .expect(200)
      .expect(response => {
        tokens.push();
        expect('token' in response.body).toBeTruthy();
      });
    expect(await prisma.user.count()).toEqual(4);
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
      .post('/postExistingRoundAnswer')
      .send({ ...ExistingRoundPayloads.postValidRoundPayload1, roundId })
      .auth(tokens[1], { type: 'bearer' })
      .expect(200);
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload2)
      .auth(tokens[2], { type: 'bearer' })
      .expect(200);
  });
  it('should have 4 users on the leaderboards', async () => {
    await request(app)
      .get('/fetchLeaderboards')
      .expect(200)
      .expect(response => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(4);
        const lastScore = Number(response.body[response.body.length - 1].score);
        expect(lastScore).toEqual(0);
      });
  });
});
