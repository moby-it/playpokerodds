import { Round } from '@moby-it/ppo-core';
import { config } from 'dotenv';
import express, { Application } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { PokerRouter } from 'routes';
import request from 'supertest';
import { mockDb, postNewRound } from '../helpers';
describe('test fetch round endpoint', () => {
  let app: Application;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(PokerRouter);
    registerErrorHandlers(app);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should get 400 on fetch round with no query params', async () => {
    await request(app).get('/fetchRound').expect(400);
  });
  it('should fetch round with invalid total hands query', async () => {
    await request(app)
      .get('/fetchRound?totalHands=30&totalKnownHands=1&boardState=1')
      .expect(400);
  });
  it('should fetch round with invalid boardState param', async () => {
    await request(app)
      .get('/fetchRound?totalHands=30&totalKnownHands=1&boardState=7')
      .expect(400);
  });
  it('should fetch round with valid params', async () => {
    await request(app)
      .get('/fetchRound?totalHands=3&totalKnownHands=2&boardState=1')
      .expect(200)
      .expect(response => {
        const round = response.body as Round;
        expect(round.myHand).toHaveLength(2);
        expect(round.board).toHaveLength(3);
        expect(round.opponentsHands).toHaveLength(2);
      });
  });
  it('should fetch round with valid params', async () => {
    await request(app)
      .get('/fetchRound?totalHands=7&totalKnownHands=2&boardState=0')
      .expect(200)
      .expect(response => {
        const round = response.body as Round;
        expect(round.myHand).toHaveLength(2);
        expect(round.board).toHaveLength(0);
        expect(round.opponentsHands).toHaveLength(6);
      });
  });
  it('should fetch round with valid params', async () => {
    await request(app)
      .get('/fetchRound?totalHands=7&totalKnownHands=2&boardState=2')
      .expect(200)
      .expect(response => {
        const round = response.body as Round;
        expect(round.board).toHaveLength(4);
      });
  });
  it('should fetch round with valid params', async () => {
    await request(app)
      .get('/fetchRound?totalHands=7&totalKnownHands=2&boardState=3')
      .expect(200)
      .expect(response => {
        const round = response.body as Round;
        expect(round.board).toHaveLength(5);
      });
  });
  for (let i = 0; i < 10; i++) {
    it('should fetch round valid random Round', async () => {
      await request(app)
        .get('/fetchRandomRound')
        .expect(200)
        .expect(response => {
          const round = Round.decode(response.body);
          expect(isRight(round)).toBeTruthy();
        });
    });
  }
  it('should fetch non existing round by id', async () => {
    await request(app).get('/fetchRoundById/somerandomId').expect(404);
  });
  it('should fetch existing round by id', async () => {
    const round = await postNewRound(app);
    await request(app).get(`/fetchRoundById/${round.id}`).expect(200);
  });
});
