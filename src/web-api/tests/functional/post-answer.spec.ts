import { EventType } from 'shared';
import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { PokerRouter } from 'routes';
import request from 'supertest';
import {
  postRoundInvalidPayload1,
  postRoundInvalidPayload2,
  postRoundInvalidPayload3,
  postValidRoundPayload1,
  postValidRoundPayload2,
  token,
  username,
} from '../fixtures';
import { mockDb } from '../helpers';
import { RoundAnswerDto } from '@moby-it/ppo-core';

describe('test post answer endpoint', () => {
  let app: Application;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(PokerRouter);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should send 400 to invalid round payload', () => {
    request(app)
      .post('/postRoundAnswer')
      .send(postRoundInvalidPayload1)
      .expect(400);
  });
  it('should send 400 to invalid round payload', () => {
    request(app)
      .post('/postRoundAnswer')
      .send(postRoundInvalidPayload2)
      .expect(400);
  });
  it('should send 400 to invalid round payload', () => {
    request(app)
      .post('/postRoundAnswer')
      .send(postRoundInvalidPayload3)
      .expect(400);
  });
  it('should post valid round payload', () => {
    request(app)
      .post('/postRoundAnswer')
      .send(postValidRoundPayload1)
      .expect(200)
      .expect(async () => {
        expect(await prisma.event.count()).toEqual(1);
        expect(await prisma.round.count()).toEqual(1);
      });
  });
  it('should post valid round payload with autheticated payload', () => {
    let totalScore = 0;
    request(app)
      .post('/postRoundAnswer')
      .send(postValidRoundPayload1)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect(async (body: RoundAnswerDto) => {
        expect(
          await prisma.event.count({
            where: { type: EventType.USER_POSTED_ANSWER },
          })
        ).toEqual(1);
        expect(await prisma.round.count()).toEqual(1);
        const user = await prisma.user.findFirst({ where: { username } });
        totalScore = body.score;
        expect(user?.score).toEqual(totalScore);
      });
    request(app)
      .post('/postRoundAnswer')
      .send(postValidRoundPayload2)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect(async (body: RoundAnswerDto) => {
        expect(
          await prisma.event.count({
            where: { type: EventType.USER_POSTED_ANSWER },
          })
        ).toEqual(1);
        expect(await prisma.round.count()).toEqual(1);
        const user = await prisma.user.findFirst({
          where: { username },
        });
        totalScore += body.score;
        expect(user?.score).toEqual(totalScore);
      });
  });
});
