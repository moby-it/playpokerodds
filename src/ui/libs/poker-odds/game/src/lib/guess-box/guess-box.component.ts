import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gtop-ui-guess-box',
  templateUrl: './guess-box.component.html',
  styleUrls: ['./guess-box.component.scss'],
})
export class GuessBoxComponent {
  @Input() loading = true;
  @Input() message = 'Guess your winning odds';
  guessForm = new FormGroup({
    estimate: new FormControl(null, [Validators.min(0)]),
  });
}
