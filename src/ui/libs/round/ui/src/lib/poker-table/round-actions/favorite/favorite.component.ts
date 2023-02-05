import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokerOddsFacade } from '@ppo/play/domain';
import { SharedUiModule } from '@ppo/shared/ui';
@Component({
  selector: 'ppo-add-round-to-favorites-button',
  template: ` <svg
    (click)="saveToFavorites()"
    ppoTooltip="Add to favorites"
    fontSize="14"
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      [attr.fill]="favoritesFill"
      d="M11.9874 10.7611L15.422 3.47874C15.8629 2.54387 17.1366 2.54387 17.5775 3.47874L21.0121 10.7611L28.6928 11.9361C29.6783 12.0868 30.071 13.3547 29.3576 14.0819L23.8008 19.7465L25.1122 27.749C25.2807 28.7767 24.25 29.5604 23.3682 29.0751L16.4998 25.2946L9.63134 29.0751C8.74957 29.5604 7.71887 28.7767 7.88728 27.749L9.19868 19.7465L3.64195 14.0819C2.9285 13.3547 3.32127 12.0868 4.30674 11.9361L11.9874 10.7611Z"
      stroke="#FAFAFB"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, SharedUiModule],
})
export class FavoriteButtonComponent {
  favoritesFill = 'transparent';
  constructor(private pokerOdds: PokerOddsFacade) {}
  @Input() roundId: string | undefined;
  saveToFavorites(): void {
    if (this.roundId) {
      if (this.favoritesFill === 'transparent') {
        this.pokerOdds.addRoundToFavorites(this.roundId).subscribe(() => {
          this.favoritesFill = 'white';
        });
      } else {
        this.pokerOdds.removeRoundFromFavorites(this.roundId).subscribe(() => {
          this.favoritesFill = 'transparent';
        });
      }
    }
  }
}
