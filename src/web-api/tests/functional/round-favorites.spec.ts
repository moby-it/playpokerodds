import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { AuthRouter, PokerRouter } from 'routes';

import request from 'supertest';
import { mockUserPayload1, NewRoundPayloads } from '../fixtures';
import { mockDb } from '../helpers';
describe('test round favorite endpoints', () => {
  let app: Application;
  let roundId = '';
  let token = '';
  let userId = '';
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(AuthRouter);
    app.use(PokerRouter);
    registerErrorHandlers(app);
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(res => {
        expect('token' in res.body).toBeTruthy();
        token = res.body.token;
        expect('id' in res.body).toBeTruthy();
        userId = res.body.id;
      });
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload2)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect(response => {
        expect(response.body.id).toBeDefined();
        roundId = response.body.id;
      });
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('prevent from adding to favorites if user is unauthorized', async () => {
    await request(app).put(`/addToFavorites/${roundId}`).send().expect(401);
  });
  it('prevent from removing from favorites if user is unauthorized', async () => {
    await request(app)
      .put(`/removeFromFavorites/${roundId}`)
      .send()
      .expect(401);
  });
  it('should not add favorite with no route param ', async () => {
    await request(app)
      .put('/addToFavorites')
      .send()
      .auth(token, { type: 'bearer' })
      .expect(404);
  });
  it('should not remove favorite with no route param ', async () => {
    await request(app)
      .put('/removeFromFavorites')
      .send()
      .auth(token, { type: 'bearer' })
      .expect(404);
  });
  it('should update round to favorite', async () => {
    await request(app)
      .put(`/addToFavorites/${roundId}`)
      .send()
      .auth(token, { type: 'bearer' })
      .expect(204);
    expect(
      await prisma.roundAnswer.count({ where: { isFavorite: true, userId } })
    ).toEqual(1);
  });
  it('should remove round from favorite', async () => {
    await request(app)
      .put(`/removeFromFavorites/${roundId}`)
      .send()
      .auth(token, { type: 'bearer' })
      .expect(204);
    expect(
      await prisma.roundAnswer.count({ where: { isFavorite: true, userId } })
    ).toEqual(0);
  });
});
