import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';
import { Animations } from '@ppo/shared/ui';
import { combineLatest, map, startWith, take, tap } from 'rxjs';
import {
  INITIAL_GUESS_BOX_MESSAGE,
  PLAYING_GUESS_BOX_MESSAGE,
} from './constants';

@Component({
  selector: 'ppo-guess-box',
  templateUrl: './guess-box.component.html',
  styleUrls: ['./guess-box.component.scss'],
  animations: [Animations.fadeAnimation],
})
export class GuessBoxComponent {
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
  private loading$ = this.pokerFacade.loading$;
  private answer$ = this.pokerFacade.answer$;
  guessForm = new FormGroup({
    estimate: new FormControl(null, [Validators.min(0), Validators.max(100)]),
  });
  vm$ = combineLatest([
    this.roundStatus$,
    this.message$,
    this.loading$,
    this.answer$,
    this.guessForm.statusChanges.pipe(
      startWith(this.guessForm.status),
      map((status) => status === 'INVALID')
    ),
  ]).pipe(
    map(([roundStatus, message, loading, answer, formInvalid]) => ({
      roundStatus,
      message,
      loading,
      answer,
      formInvalid,
    }))
  );
  constructor(private pokerFacade: PokerOddsFacade) {}

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
          }
        })
      )
      .subscribe();
  }
}
