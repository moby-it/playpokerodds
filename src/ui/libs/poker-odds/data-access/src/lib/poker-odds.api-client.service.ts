import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PokerOddsApiClient {
  constructor(private http: HttpClient) {}
  fetchRound() {
    throw new Error('Not yet implemented');
  }
  postRoundAnswer() {
    throw new Error('Not yet implemented');
  }
}
