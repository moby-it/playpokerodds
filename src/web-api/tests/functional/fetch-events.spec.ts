import { config } from 'dotenv';
import express, { Application } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { decode } from 'jsonwebtoken';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { AuthRouter, PokerRouter } from 'routes';
import { DecodedJwt } from 'shared';
import request from 'supertest';
import { mockDb } from '..//helpers';
import { mockUserPayload1 } from '../fixtures';

describe('test fetch events endpoint', () => {
  let app: Application;
  let token: string;
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
  it('should get 401 while fetching events, if user is not an admin', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(body => {
        expect(body).toBeDefined();
      });
    expect(await prisma.user.count()).toEqual(1);
    await request(app)
      .post('/login')
      .send(mockUserPayload1)
      .expect(200)
      .expect(response => {
        expect(response.body).toBeDefined();
        expect(response.body.token).toBeDefined();
        token = response.body.token;
      });
    await request(app).get('/fetchEvents').expect(401);
  });

  it('should add user to admins', async () => {
    const decodedToken = DecodedJwt.decode(decode(token));
    const validToken = () => isRight(decodedToken);
    expect(validToken()).toBeTruthy();
    await prisma.userRole.create({
      data: { role: 2, userEmail: mockUserPayload1.email },
    });
    expect(await prisma.userRole.count()).toEqual(1);
  });
  it('should relogin for admin user', async () => {
    await request(app)
      .post('/login')
      .send(mockUserPayload1)
      .expect(200)
      .expect(response => {
        expect(response.body).toBeDefined();
        expect(response.body.token).toBeDefined();
        token = response.body.token;
      });
  });
  it('should fetch events if user is admin', async () => {
    await request(app)
      .get('/fetchEvents')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(body => {
        expect(body).toBeDefined();
      });
  });
});
