import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { AuthRouter, PokerRouter, UserRouter } from 'routes';
import request from 'supertest';
import { mockDb } from '..//helpers';
import { mockUserPayload1, NewRoundPayloads } from '../fixtures';
describe('test fetch events endpoint', () => {
  let app: Application;
  const usernames: string[] = [];
  let token: string;
  let userScore = 0;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(AuthRouter);
    app.use(UserRouter);
    app.use(PokerRouter);
    registerErrorHandlers(app);
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect((res) => {
        token = res.body.token;
        usernames.push(res.body.username);
      });
    await request(app)
      .post('/postNewRoundAnswer')
      .auth(token, { type: 'bearer' })
      .send(NewRoundPayloads.postValidRoundPayload1)
      .expect(200)
      .expect((response) => {
        userScore += response.body.score;
      });
    await request(app)
      .post('/postNewRoundAnswer')
      .auth(token, { type: 'bearer' })
      .send(NewRoundPayloads.postValidRoundPayload2)
      .expect(200)
      .expect((response) => {
        userScore += response.body.score;
      });
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });

  it('should get 404 if searching for a non existing username', async () => {
    await request(app).get('/fetchByUsername/fasolakis').expect(404);
  });
  it('should get user details for an existing user', async () => {
    await request(app)
      .get('/fetchByUsername/gerogesp')
      .expect(200)
      .expect((response) => {
        expect('rounds' in response.body).toBeTruthy();
        expect(response.body.rounds).toHaveLength(2);
        // should hide odds for other user
        expect(
          response.body.rounds.every(
            (r: { odds: number }) => r.odds == -1 && 'score' in r
          )
        ).toBeTruthy();

        expect('rank' in response.body).toBeTruthy();
        expect('username' in response.body).toBeTruthy();
        expect(response.body.username).toEqual('gerogesp');

        expect(response.body.rank).toEqual(1);
        expect('score' in response.body).toBeTruthy();
        expect(response.body.score).toEqual(userScore);
      });
  });
  it('should get user details my user', async () => {
    await request(app)
      .get('/fetchByUsername/gerogesp')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect((response) => {
        expect('rounds' in response.body).toBeTruthy();
        expect(
          response.body.rounds.every(
            (round: { score: number; odds: number; estimate: number }) => {
              return (
                round.score ===
                Math.abs(+(round.estimate - round.odds).toFixed(2))
              );
            }
          )
        ).toBeTruthy();

        expect(response.body.rounds).toHaveLength(2);
        expect('username' in response.body).toBeTruthy();
        expect(response.body.username).toEqual('gerogesp');
        // should show odds if I look at my profile
        expect(
          response.body.rounds.every((r: { odds: number }) => r.odds != -1)
        ).toBeTruthy();

        expect('rank' in response.body).toBeTruthy();
        expect(response.body.rank).toEqual(1);
        expect('score' in response.body).toBeTruthy();
        expect(response.body.score).toEqual(userScore);
      });
  });
});
