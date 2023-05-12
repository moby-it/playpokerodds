import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable, combineLatest, debounceTime, filter, map, switchMap, timer, withLatestFrom } from 'rxjs';
import { environment } from '../../environments/environment';
export enum EventType {
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_FETCHED_ROUND = 'USER_FETCHED_ROUND',
  USER_POSTED_ANSWER = 'USER_POSTED_ANSWER',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
export type Filters = {
  pageSize: number,
  page: number;
  term: string;
};
export interface AppEvent {
  id: string;
  type: string;
  payload: string; // JSON
  timestamp: string;
}
interface DashboardEventsState {
  events: AppEvent[];
  total: number;
  tableReady: boolean;
  filters: Filters;
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
      total: 0,
      filters: {
        page: 0,
        pageSize: 10,
        term: ''
      }
    });
    combineLatest([timer(0, 30 * 1000), this.filters$]).pipe(debounceTime(500)).subscribe(() => {
      this.fetchEvents$();
    });
  }
  events$ = this.select((state) => state.events).pipe(
    filter((e) => !!e.length)
  );
  filters$ = this.select((state) => state.filters);
  pagination$ = this.select(state => ({ total: state.total, pageSize: state.filters.pageSize, pageIndex: state.filters.page }));
  updateTerm = this.updater((state, term: string) => ({
    ...state, filters: { ...state.filters, term, page: 0 }
  }));
  changePagination = this.updater((state, pagination: { pageSize: number, page: number; }) => ({
    ...state, filters: { ...state.filters, page: pagination.page, pageSize: pagination.pageSize }
  }));
  private updateTotal = this.updater((state, total: number) => ({ ...state, total }));
  tableReady$ = this.select((state) => state.tableReady);
  private setEvents = this.updater((state, events: AppEvent[]) => ({
    ...state,
    events,
    tableReady: true,
  }));
  private fetchEvents$ = this.effect((source$: Observable<void>) =>
    source$.pipe(
      withLatestFrom(this.filters$),
      map(([, filters]) =>
        new HttpParams().set('page', filters.page + 1).set('pageSize', filters.pageSize).set('term', filters.term)
      ),
      switchMap((params: HttpParams) => this.http.get<{ events: AppEvent[], total: number; }>(environment.apiUrl + '/poker/fetchEvents', { params })),
      tapResponse(
        ({ events, total }) => {
          this.setEvents(events as AppEvent[]);
          this.updateTotal(total);
        },
        (e: HttpErrorResponse) => {
          console.error(e);
          return EMPTY;
        }
      )
    )
  );
}
