import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { PokerRouter } from 'routes';
import request from 'supertest';
import { ExistingRoundPayloads, NewRoundPayloads } from '../fixtures';
import { mockDb } from '../helpers';
describe('test post existing round answer endpoint', () => {
  let roundId: '';
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
  it('should play a new Round', async () => {
    await request(app)
      .post('/postNewRoundAnswer')
      .send(NewRoundPayloads.postValidRoundPayload1)
      .expect(200)
      .expect(res => {
        expect('id' in res.body).toBeTruthy();
        roundId = res.body.id;
      });
    expect(await prisma.event.count()).toEqual(1);
    expect(await prisma.round.count()).toEqual(1);
  });
  it('should post valid round payload', async () => {
    await request(app)
      .post('/postExistingRoundAnswer')
      .send({ ...ExistingRoundPayloads.postValidRoundPayload1, roundId })
      .expect(200);
    expect(await prisma.event.count()).toEqual(2);
    expect(await prisma.round.count()).toEqual(1);
    expect(await prisma.roundAnswer.count()).toEqual(2);
  });
  it('should post valid round payload', async () => {
    await request(app)
      .post('/postExistingRoundAnswer')
      .send({ ...ExistingRoundPayloads.postValidRoundPayload1, roundId })
      .expect(200);
    expect(await prisma.event.count()).toEqual(3);
    expect(await prisma.round.count()).toEqual(1);
    expect(await prisma.roundAnswer.count()).toEqual(3);
  });
});
