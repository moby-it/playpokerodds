import { Component, Input, effect, input, output } from '@angular/core';

@Component({
  selector: 'ppo-play-button',
  templateUrl: './play-button.component.html',
  standalone: true
})
export class PlayButtonComponent {
  disabled = input(false);
  buttonClicked = output<void>();
  clicked(): void {
    this.buttonClicked.emit();
  }
}
