import { Component, Input } from '@angular/core';
import { RoundAnswer } from '@ppo/round/domain';

@Component({
  selector: 'ppo-round-result',
  templateUrl: './round-result.component.html',
})
export class RoundResultComponent {
  @Input() answer: RoundAnswer | undefined | null;
}
