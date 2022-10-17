import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';
import { Animations } from '@ppo/shared/ui';
import { combineLatest, map, take, tap } from 'rxjs';
import {
  COMPLETED_GUESS_BOX_MESSAGE,
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
  vm$ = combineLatest([
    this.roundStatus$,
    this.message$,
    this.loading$,
    this.answer$,
  ]).pipe(
    map(([roundStatus, message, loading, answer]) => ({
      roundStatus,
      message,
      loading,
      answer,
    }))
  );
  constructor(private pokerFacade: PokerOddsFacade) {}
  guessForm = new FormGroup({
    estimate: new FormControl(null, [Validators.min(0)]),
  });
  playButtonHandler() {
    this.roundStatus$
      .pipe(
        take(1),
        tap((status) => {
          const estimate = this.guessForm.getRawValue().estimate;
          if (status === 'Playing' && estimate) {
            this.pokerFacade.submitEstimate(estimate);
          } else {
            this.pokerFacade.startNewRound();
          }
        })
      )
      .subscribe();
  }
}
