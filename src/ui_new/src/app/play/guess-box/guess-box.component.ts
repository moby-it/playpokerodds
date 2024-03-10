import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PokerOddsStore } from '@app/play/poker-odds.store';
import { GuessBoxAnswerMessagePipe } from '@app/round/helpers/guess-box-message.pipe';
import { ScoreIsAccuratePipe } from '@app/round/helpers/scoreIsAccurate';
import { RoundResultComponent } from '@app/round/poker-table/round-result/round-result.component';
import { LoaderComponent } from '@app/shared/ui/loader/loader.component';
import { fadeAnimation } from '@app/shared/ui/animations/fadeIn';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { PostRoundActionsComponent } from '../post-round-actions/post-round-actions.component';
import {
  INITIAL_GUESS_BOX_MESSAGE,
  PLAYING_GUESS_BOX_MESSAGE,
} from './constants';
import { map, tap } from 'rxjs';

@Component({
  selector: 'ppo-guess-box',
  imports: [
    RoundResultComponent,
    PostRoundActionsComponent,
    LoaderComponent,
    ReactiveFormsModule,
    ScoreIsAccuratePipe,
    GuessBoxAnswerMessagePipe,
    PlayButtonComponent,
  ],
  templateUrl: './guess-box.component.html',
  animations: [fadeAnimation],
  standalone: true
})
export class GuessBoxComponent {
  constructor(private pokerStore: PokerOddsStore, private router: Router) { }
  guessForm = new FormGroup({
    estimate: new FormControl(null, [Validators.min(0), Validators.max(100)]),
  });
  private formStatus = toSignal(this.guessForm.statusChanges.pipe(map(s => s !== 'VALID')));
  private roundStatus = this.pokerStore.roundStatus;
  private message = computed(() => {
    switch (this.pokerStore.roundStatus()) {
      case 'Initial':
        return INITIAL_GUESS_BOX_MESSAGE;
      case 'Playing':
        return PLAYING_GUESS_BOX_MESSAGE;
      default:
        return '';
    }
  });

  vm = computed(() => ({
    roundStatus: this.roundStatus(),
    message: this.message(),
    fetchingRound: this.pokerStore.fetchingRound(),
    calculatingAnswer: this.pokerStore.calculatingAnswer(),
    answer: this.pokerStore.answer(),
    formInvalid: !!this.formStatus(),
  }));

  playButtonHandler(): void {
    const status = this.roundStatus();
    const estimate = this.guessForm.getRawValue().estimate;
    if (status === 'Playing' && typeof estimate === 'number') {
      this.pokerStore.submitEstimate(estimate);
    } else if (status === 'Completed' || status === 'Initial') {
      this.pokerStore.startNewRound();
      this.guessForm.reset();
      this.router.navigate(['play']);
    }
  }
}
