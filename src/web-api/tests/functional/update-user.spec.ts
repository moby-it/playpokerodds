import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { AuthRouter, UserRouter } from 'routes';

import request from 'supertest';
import {
  INVALID_mockUpdateUserPayload1,
  INVALID_mockUpdateUserPayload2,
  INVALID_mockUpdateUserPayload3,
  mockUserPayload1,
  VALID_mockUpdateUserPayload1,
} from '../fixtures';
import { mockDb } from '../helpers';
describe('test round favorite endpoints', () => {
  let app: Application;
  let token = '';
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(AuthRouter);
    app.use(UserRouter);
    registerErrorHandlers(app);
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect((res) => {
        expect('token' in res.body).toBeTruthy();
        token = res.body.token;
        expect('id' in res.body).toBeTruthy();
      });
  });
  afterAll(async () => {
    await mockDb.tearDown(prisma);
  });
  it('should not be able to update for an unauthorized user', async () => {
    await request(app)
      .put('/update')
      .send(INVALID_mockUpdateUserPayload1)
      .expect(401);
  });
  it('should not be able to update for an authorized user with an invalid payload', async () => {
    await request(app)
      .put('/update')
      .auth(token, { type: 'bearer' })
      .send(INVALID_mockUpdateUserPayload1)
      .expect(400);
    await request(app)
      .put('/update')
      .auth(token, { type: 'bearer' })
      .send(INVALID_mockUpdateUserPayload2)
      .expect(400);
    await request(app)
      .put('/update')
      .auth(token, { type: 'bearer' })
      .send(INVALID_mockUpdateUserPayload3)
      .expect(400);
  });
  it('should update user payload', async () => {
    await request(app)
      .put('/update')
      .auth(token, { type: 'bearer' })
      .send(VALID_mockUpdateUserPayload1)
      .expect(204);
    await request(app)
      .post('/login')
      .send({ ...mockUserPayload1, ...VALID_mockUpdateUserPayload1 })
      .expect(200)
      .expect((res) => {
        expect('token' in res.body).toBeTruthy();
        expect('id' in res.body).toBeTruthy();
        expect('username' in res.body).toBeTruthy();
        expect('email' in res.body).toBeTruthy();
        expect(res.body.email).toEqual(VALID_mockUpdateUserPayload1.email);
        expect(res.body.username).toEqual(
          VALID_mockUpdateUserPayload1.username
        );
      });
  });
});
