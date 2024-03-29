import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'ppo-round-result',
  templateUrl: './round-result.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class RoundResultComponent {

  size = input('md');
  header = input();
  body = input();
  classes = input<string[]>();

  headerClass = 'lg';
  bodyClass = 'sm';
  constructor() {
    effect(() => {
      if (this.size() === 'lg') {
        this.headerClass = 'xl';
        this.bodyClass = 'md';
      }
    });
  }
}
