import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { AuthRouter, PokerRouter } from 'routes';
import { EventType } from 'shared';
import request from 'supertest';
import { mockUserPayload1, NewRoundPayloads } from '../fixtures';
import { mockDb } from '../helpers';
describe('test post new round answer endpoint', () => {
  let totalScore = 0;
  let username = '';
  let token = '';
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
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postRoundInvalidPayload1)
      .expect(400)
      .end(done);
  });
  it('should send 400 to invalid round payload', async () => {
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postRoundInvalidPayload2)
      .expect(400);
  });
  it('should send 400 to invalid round payload', async () => {
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postRoundInvalidPayload3)
      .expect(400);
  });
  it('should register user', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(res => {
        expect('token' in res.body).toBeTruthy();
        token = res.body.token;
        expect('username' in res.body).toBeTruthy();
        username = res.body.username;
      });
  });
  it('should post valid round payload with unauthenticated user', async () => {
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload1)
      .expect(200);
    expect(await prisma.event.count()).toEqual(2);
    expect(await prisma.round.count()).toEqual(1);
    expect(await prisma.roundAnswer.count()).toEqual(1);
  });
  it('should post valid round payload with autheticated user', async () => {
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload2)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect(response => {
        totalScore = response.body.score;
      });
    const user = await prisma.user.findFirst({ where: { username } });
    expect(user).toBeDefined();
    expect(Math.abs(Number(user?.score))).toEqual(Math.abs(totalScore));
    expect(
      await prisma.event.count({
        where: { type: EventType.USER_POSTED_ANSWER },
      })
    ).toEqual(2);
    expect(await prisma.round.count()).toEqual(2);
    expect(await prisma.roundAnswer.count()).toEqual(2);
  });
});
