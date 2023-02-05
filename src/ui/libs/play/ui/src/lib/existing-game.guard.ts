import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { PokerOddsFacade } from '@ppo/play/domain';
import { map, Observable, skipWhile } from 'rxjs';
@Injectable()
export class ExistingGameGuard implements CanActivate {
  constructor(private pokerFadace: PokerOddsFacade, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const id = route.params['id'];
    if (!id) return true;
    this.pokerFadace.fetchAndSetExistingRound(id);
    return this.pokerFadace.currentRound$.pipe(
      skipWhile((r) => !r),
      map((e) => true)
    );
  }
}