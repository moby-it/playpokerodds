import { Application } from 'express';
import { RoundAnswerResponse } from 'routes';
import request from 'supertest';
import { NewRoundPayloads } from '../fixtures';

export async function postNewRound(
  app: Application
): Promise<RoundAnswerResponse> {
  return await request(app)
    .post('/postNewRoundAnswer')
    .send(NewRoundPayloads.postValidRoundPayload2)
    .expect(200)
    .then(response => response.body);
}
