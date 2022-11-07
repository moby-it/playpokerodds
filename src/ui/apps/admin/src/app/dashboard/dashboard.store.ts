import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, filter, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
export enum EventType {
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_FETCHED_ROUND = 'USER_FETCHED_ROUND',
  USER_POSTED_ANSWER = 'USER_POSTED_ANSWER',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AppEvent {
  id: string;
  type: string;
  payload: string; // JSON
  timestamp: string;
}
interface DashboardEventsState {
  events: AppEvent[];
  tableReady: boolean;
  last24hLogins: number;
  last24hRoundsPlayed: number;
}
@Injectable()
export class DashboardStore extends ComponentStore<DashboardEventsState> {
  constructor(private http: HttpClient) {
    super({
      events: [],
      tableReady: false,
      last24hLogins: 0,
      last24hRoundsPlayed: 0,
    });
    this.fetchEvents$();
    setInterval(() => this.fetchEvents$(), 30000);
  }
  events$ = this.select((state) => state.events).pipe(
    filter((e) => !!e.length)
  );
  last24hRoundsPlayed$ = this.events$.pipe(
    map(
      (events) =>
        events
          .filter((e) => e.type === EventType.USER_POSTED_ANSWER)
          .filter(
            (e) =>
              Date.now() - new Date(e.timestamp).getTime() < 24 * 60 * 60 * 1000
          ).length
    )
  );
  last24hUsersLoggedIn$ = this.events$.pipe(
    map(
      (events) =>
        events
          .filter((e) => e.type === EventType.USER_LOGGED_IN)
          .filter(
            (e) =>
              Date.now() - new Date(e.timestamp).getTime() < 24 * 60 * 60 * 1000
          ).length
    )
  );
  last24hUsersRegistered$ = this.events$.pipe(
    map(
      (events) =>
        events.filter((e) => e.type === EventType.USER_REGISTERED).length
    )
  );
  tableReady$ = this.select((state) => state.tableReady);
  private setEvents = this.updater((state, events: AppEvent[]) => ({
    ...state,
    events,
    tableReady: true,
  }));
  private fetchEvents$ = this.effect((source$: Observable<void>) =>
    source$.pipe(
      switchMap(() => this.http.get(environment.apiUrl + '/poker/fetchEvents')),
      tapResponse(
        (e) => this.setEvents(e as AppEvent[]),
        (e: HttpErrorResponse) => {
          console.error(e);
          return EMPTY;
        }
      )
    )
  );
}
