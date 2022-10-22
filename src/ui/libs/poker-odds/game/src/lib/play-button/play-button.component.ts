import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ppo-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent {
  @Input() disabled = false;
  @Output() buttonClicked = new EventEmitter();
  clicked(): void {
    this.buttonClicked.emit();
  }
}
