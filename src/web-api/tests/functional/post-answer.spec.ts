import { RoundAnswerDto } from '@moby-it/ppo-core';
import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { PokerRouter } from 'routes';
import { EventType } from 'shared';
import request, { SuperTest } from 'supertest';
import {
  postRoundInvalidPayload1,
  postRoundInvalidPayload2,
  postRoundInvalidPayload3,
  postValidRoundPayload1,
  postValidRoundPayload2,
  token,
  username
} from '../fixtures';
import { mockDb } from '../helpers';

describe('test post answer endpoint', () => {
  let totalScore = 0;
  let app: Application;
  let supertest: SuperTest<request.Test>;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(PokerRouter);
    supertest = request(app);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should send 400 to invalid round payload', done => {
    supertest
      .post('/postNewRoundAnswer')
      .send(postRoundInvalidPayload1)
      .expect(400)
      .end(done);
  });
  it('should send 400 to invalid round payload', done => {
    supertest
      .post('/postNewRoundAnswer')
      .send(postRoundInvalidPayload2)
      .expect(400)
      .end(done);
  });
  it('should send 400 to invalid round payload', done => {
    supertest
      .post('/postNewRoundAnswer')
      .send(postRoundInvalidPayload3)
      .expect(400)
      .end(done);
  });
  it('should post valid round payload', done => {
    supertest
      .post('/postNewRoundAnswer')
      .send(postValidRoundPayload1)
      .expect(200)
      .expect(async () => {
        expect(await prisma.event.count()).toEqual(1);
        expect(await prisma.round.count()).toEqual(1);
        expect(await prisma.roundAnswer.count()).toEqual(1);
      })
      .end(done);
  });
  it('should post valid round payload with autheticated payload', done => {
    supertest
      .post('/postNewRoundAnswer')
      .send(postValidRoundPayload2)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect(async (body: RoundAnswerDto) => {
        const user = await prisma.user.findFirst({ where: { username } });
        totalScore = body.score;
        expect(user?.score).toEqual(totalScore);
        expect(
          await prisma.event.count({
            where: { type: EventType.USER_POSTED_ANSWER },
          })
        ).toEqual(2);
        expect(await prisma.round.count()).toEqual(2);
        expect(await prisma.roundAnswer.count()).toEqual(2);
      })
      .end(done);
  });
});
