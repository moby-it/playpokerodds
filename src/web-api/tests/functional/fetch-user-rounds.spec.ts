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
  NewRoundPayloads
} from '../fixtures';
import { mockDb } from '../helpers';

describe('test fetch user rounds endpoint', () => {
  let app: Application;
  const tokens: string[] = [];
  const userIds: string[] = [];
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(PokerRouter);
    app.use(AuthRouter);
    registerErrorHandlers(app);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should register users', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(res => {
        expect('token' in res.body).toBeTruthy();
        tokens.push(res.body.token);
        expect('username' in res.body).toBeTruthy();
        userIds.push(res.body.id);
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload2)
      .expect(200)
      .expect(res => {
        expect('token' in res.body).toBeTruthy();
        tokens.push(res.body.token);
        expect('username' in res.body).toBeTruthy();
        userIds.push(res.body.id);
      });
  });
  it('should submit three user rounds', async () => {
    let roundId = '';
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload1)
      .auth(tokens[0], { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect('id' in response.body).toBeTruthy();
        roundId = response.body.id;
      });
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload2)
      .auth(tokens[1], { type: 'bearer' })
      .expect(200);
    await request(app)
      .post('/postExistingRoundAnswer')
      .send({ ...ExistingRoundPayloads.postValidRoundPayload1, roundId })
      .auth(tokens[1], { type: 'bearer' })
      .expect(200);
    expect(
      await prisma.roundAnswer.count({ where: { userId: userIds[0] } })
    ).toEqual(1);
    expect(
      await prisma.roundAnswer.count({ where: { userId: userIds[1] } })
    ).toEqual(2);
  });
  it('should respond only to authorized requests', async () => {
    await request(app).get('/fetchUserRounds').expect(401);
  });
  it('should have two rounds played for user 1 and one for user 2', async () => {
    await request(app)
      .get('/fetchUserRounds')
      .auth(tokens[0], { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect(response.body.length).toEqual(1);
      });
    await request(app)
      .get('/fetchUserRounds')
      .auth(tokens[1], { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect(response.body.length).toEqual(2);
      });
  });
  it('should validate that response array length', async () => {
    await request(app)
      .get('/fetchUserRounds')
      .auth(tokens[1], { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect(response.body.length).toEqual(2);
        expect(Array.isArray(response.body)).toBeTruthy();
      });
  });
});
