import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMiddleware } from '';
import { prisma } from '@infrastructure';
import { AuthRouter } from 'src/application/routes';
import request from 'supertest';
import {
  mockUserPayload1,
  mockUserInvalidPayload1,
  mockUserInvalidPayload2,
} from '../fixtures';
import { mockDb } from '../helpers';
describe('test auth endpoints', () => {
  let app: Application;
  let token: string;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(AuthRouter);
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should fail to register user with invalid payload', async () => {
    await request(app)
      .post('/register')
      .send(mockUserInvalidPayload1)
      .expect(400);
  });
  it('should fail to register user with invalid email', async () => {
    await request(app)
      .post('/register')
      .send(mockUserInvalidPayload2)
      .expect(400);
  });
  it('should register user', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect(body => {
        expect(body).toBeDefined();
      });
  });
  it('should have one user in database', async () => {
    expect(await prisma.user.count()).toEqual(1);
  });
  it('should login user', async () => {
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
  it('should change username', async () => {
    const newUsername = 'fasolakis';
    await request(app)
      .post('/changeUsername')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: newUsername })
      .expect(200)
      .expect(async response => {
        expect(response.body).toBeDefined();
        expect(
          await prisma.user.count({ where: { username: newUsername } })
        ).toEqual(1);
      });
  });
});
