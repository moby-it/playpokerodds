import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerErrorHandlers, registerMiddleware } from 'middleware';
import prisma from 'prisma';
import { HealthRouter } from 'routes';
import { EventType } from 'shared';
import request from 'supertest';
describe('test health endpoints', () => {
  let app: Application;
  beforeAll(async () => {
    config();
    app = express();
    registerMiddleware(app);
    app.use(HealthRouter);
    registerErrorHandlers(app);
  });
  it('should test liveness endpoint', async () => {
    await request(app).get('/liveness').expect(200);
  });
  it('should test readiness endpoint', async () => {
    await request(app).get('/readiness').expect(200);
  });
  it('should test submit error endpoint', async () => {
    await request(app)
      .post('/logError')
      .send({ body: 'somerrorbody' })
      .expect(201);
    expect(
      await prisma.event.count({
        where: {
          type: EventType.UI_ERROR,
        },
      })
    ).toEqual(1);
  });
});
