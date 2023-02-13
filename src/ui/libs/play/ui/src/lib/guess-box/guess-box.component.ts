import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokerOddsFacade } from '@ppo/play/domain';
import { Animations } from '@ppo/shared/ui';
import { combineLatest, map, startWith, take, tap } from 'rxjs';
import {
  INITIAL_GUESS_BOX_MESSAGE,
  PLAYING_GUESS_BOX_MESSAGE,
} from './constants';

@Component({
  selector: 'ppo-guess-box',
  templateUrl: './guess-box.component.html',
  animations: [Animations.fadeAnimation],
})
export class GuessBoxComponent {
  constructor(private pokerFacade: PokerOddsFacade, private router: Router) {}
  private roundStatus$ = this.pokerFacade.roundStatus$;
  private message$ = this.roundStatus$.pipe(
    map((status) => {
      switch (status) {
        case 'Initial':
          return INITIAL_GUESS_BOX_MESSAGE;
        case 'Playing':
          return PLAYING_GUESS_BOX_MESSAGE;
        default:
          return '';
      }
    })
  );
  guessForm = new FormGroup({
    estimate: new FormControl(null, [Validators.min(0), Validators.max(100)]),
  });
  vm$ = combineLatest([
    this.roundStatus$,
    this.message$,
    this.pokerFacade.fetchingRound$,
    this.pokerFacade.calculatingAnswer$,
    this.pokerFacade.answer$,
    this.guessForm.statusChanges.pipe(
      startWith(this.guessForm.status),
      map((status) => status === 'INVALID')
    ),
  ]).pipe(
    map(
      ([
        roundStatus,
        message,
        fetchingRound,
        calculatingAnswer,
        answer,
        formInvalid,
      ]) => ({
        roundStatus,
        message,
        fetchingRound,
        calculatingAnswer,
        answer,
        formInvalid,
      })
    )
  );

  playButtonHandler(): void {
    this.roundStatus$
      .pipe(
        take(1),
        tap((status) => {
          const estimate = this.guessForm.getRawValue().estimate;
          if (status === 'Playing' && typeof estimate === 'number') {
            this.pokerFacade.submitEstimate(estimate);
          } else if (status === 'Completed' || status === 'Initial') {
            this.pokerFacade.startNewRound();
            this.guessForm.reset();
            this.router.navigate(['play']);
          }
        })
      )
      .subscribe();
  }
}
