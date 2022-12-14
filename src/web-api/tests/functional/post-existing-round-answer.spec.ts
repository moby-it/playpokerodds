import { config } from 'dotenv';
import express, { Application } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { AuthRouter, PokerRouter, RoundAnswerResponse } from 'routes';
import request from 'supertest';
import {
  ExistingRoundPayloads,
  mockUserPayload1,
  mockUserPayload2,
  NewRoundPayloads,
} from '../fixtures';
import { mockDb } from '../helpers';
describe('test post existing round answer endpoint', () => {
  let roundId: '';
  const tokens: string[] = [];
  const usernames: string[] = [];
  const userScores: number[] = [];
  let app: Application;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(PokerRouter);
    app.use(AuthRouter);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should send 400 to invalid round payload', done => {
    request(app)
      .post('/postExistingRoundAnswer')
      .send(ExistingRoundPayloads.postRoundInvalidPayload1)
      .expect(400)
      .end(done);
  });
  it('should send 400 to invalid round payload', async () => {
    await request(app)
      .post('/postExistingRoundAnswer')
      .send(ExistingRoundPayloads.postRoundInvalidPayload2)
      .expect(400);
  });
  it('should send 400 to invalid round payload', async () => {
    await request(app)
      .post('/postExistingRoundAnswer')
      .send(ExistingRoundPayloads.postRoundInvalidPayload3)
      .expect(400);
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
        usernames.push(res.body.username);
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload2)
      .expect(200)
      .expect(res => {
        expect('token' in res.body).toBeTruthy();
        tokens.push(res.body.token);
        expect('username' in res.body).toBeTruthy();
        usernames.push(res.body.username);
      });
  });
  it('should play a new Round', async () => {
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload1)
      .expect(200)
      .expect(res => {
        expect('id' in res.body).toBeTruthy();
        roundId = res.body.id;
      });
    expect(await prisma.event.count()).toEqual(3);
    expect(await prisma.round.count()).toEqual(1);
  });
  it('should post valid round payload with auth', async () => {
    await request(app)
      .post('/postExistingRoundAnswer')
      .send({ ...ExistingRoundPayloads.postValidRoundPayload1, roundId })
      .auth(tokens[0], { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect('score' in response.body).toBeTruthy();
        userScores.push(Math.abs(response.body.score));
      });
    expect(await prisma.event.count()).toEqual(4);
    expect(await prisma.round.count()).toEqual(1);
    expect(await prisma.roundAnswer.count()).toEqual(2);
  });
  it('should have correctly updated user score', async () => {
    const user = await prisma.user.findFirst({
      where: { username: usernames[0] },
    });
    expect(user).toBeDefined();
    expect(Math.abs(Number(user?.score))).toEqual(Math.abs(userScores[0]));
  });
  it('should post valid round payload', async () => {
    await request(app)
      .post('/postExistingRoundAnswer')
      .send({ ...ExistingRoundPayloads.postValidRoundPayload1, roundId })
      .auth(tokens[1], { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect('score' in response.body).toBeTruthy();
        userScores.push(Math.abs(response.body.score));
      });
    expect(await prisma.event.count()).toEqual(5);
    expect(await prisma.round.count()).toEqual(1);
    expect(await prisma.roundAnswer.count()).toEqual(3);
  });
  it('should have correctly updated user score', async () => {
    const user = await prisma.user.findFirst({
      where: { username: usernames[1] },
    });
    expect(user).toBeDefined();
    expect(Math.abs(Number(user?.score))).toEqual(Math.abs(userScores[1]));
  });
});
