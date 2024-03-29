import { config } from 'dotenv';
import express, { Application } from 'express';
import { decode } from 'jsonwebtoken';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import { UserRoles } from 'model';
import prisma from 'prisma';
import { AuthRouter } from 'routes';
import { DecodedJwt, decodedJwtIsValid } from 'shared';
import request from 'supertest';
import {
  mockUserInvalidPayload1,
  mockUserInvalidPayload2,
  mockUserInvalidPayload3,
  mockUserPayload1,
  mockUserPayload2,
  mockUserPayload5,
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
    registerErrorHandlers(app);
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
  it('should fail to register user no password', async () => {
    await request(app)
      .post('/register')
      .send(mockUserInvalidPayload3)
      .expect(400);
  });
  it('should register user', async () => {
    await request(app)
      .post('/register')
      .send(mockUserPayload1)
      .expect(200)
      .expect((body) => {
        expect(body).toBeDefined();
      });
    await request(app)
      .post('/register')
      .send(mockUserPayload2)
      .expect(200)
      .expect((body) => {
        expect(body).toBeDefined();
      });
  });
  it('should have two users in database', async () => {
    expect(await prisma.user.count()).toEqual(2);
  });
  it('should fail to login for useemail that does not exist', async () => {
    await request(app).post('/login').send(mockUserPayload5).expect(401);
  });
  it('should fail to login for useemail with wrong credentials', async () => {
    await request(app)
      .post('/login')
      .send({ ...mockUserPayload1, password: 'Somewrongpasswrasd' })
      .expect(401);
  });

  it('should login user', async () => {
    await request(app)
      .post('/login')
      .send(mockUserPayload1)
      .expect(200)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.token).toBeDefined();
        token = response.body.token;
      });
  });
  it('should include role in token', () => {
    const decodedToken = decode(token) as DecodedJwt;
    expect(decodedJwtIsValid(decodedToken)).toBeTruthy();
    expect(decodedToken.role).toEqual(0);
  });

  it('should add user as admin', async () => {
    const result = await prisma.userRole.create({
      data: { role: UserRoles.Admin, userEmail: mockUserPayload1.email },
    });
    expect(result).toBeDefined();
  });
  it('should not let normal user login as admin', async () => {
    await request(app).post('/admin-login').send(mockUserPayload2).expect(401);
  });
  it('should admin user login as admin', async () => {
    await request(app)
      .post('/admin-login')
      .send(mockUserPayload1)
      .expect(200)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.token).toBeDefined();
        token = response.body.token;
      });
  });
  it('should not be able to refresh with no token', async () => {
    await request(app).get('/refreshToken').expect(401);
  });
  it('should refresh a user token', async () => {
    await request(app)
      .get('/refreshToken')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.token).toBeDefined();
      });
  });
});
