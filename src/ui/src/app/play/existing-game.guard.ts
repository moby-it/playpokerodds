import { Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { PokerOddsStore } from '@app/play/poker-odds.store';
import { map, Observable, skipWhile } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ExistingGameGuard {
  constructor(private pokerFadace: PokerOddsStore, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const id = route.params['id'];
    if (!id) return true;
    this.pokerFadace.fetchAndSetExistingRound(id);
    return toObservable(this.pokerFadace.currentRound).pipe(
      skipWhile((r) => !r),
      map((e) => true)
    );
  }
}
