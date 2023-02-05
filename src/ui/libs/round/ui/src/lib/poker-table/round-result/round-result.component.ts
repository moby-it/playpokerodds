import { Component, Input } from '@angular/core';

@Component({
  selector: 'ppo-round-result',
  templateUrl: './round-result.component.html',
})
export class RoundResultComponent {
  @Input() header: string | number | undefined | null;
  @Input() body: string | number | undefined | null;
  @Input() classes: string[] = [];
}
