import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokerOddsFacade } from '@ppo/poker-odds/data-access';

@Component({
  selector: 'ppo-guess-box',
  templateUrl: './guess-box.component.html',
  styleUrls: ['./guess-box.component.scss'],
})
export class GuessBoxComponent {
  @Input() loading = true;
  @Input() message = 'Guess your winning odds';
  constructor(private pokerFacade: PokerOddsFacade) {}
  guessForm = new FormGroup({
    estimate: new FormControl(null, [Validators.min(0)]),
  });
  playButtonHandler() {
    this.pokerFacade.startNewRound();
  }
}
