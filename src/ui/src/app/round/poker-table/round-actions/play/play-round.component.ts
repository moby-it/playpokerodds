
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'ppo-play-round-button',
  template: `<svg
    ppoTooltip="Play round"
    fontSize="14"
    (click)="playRound()"
    width="40"
    height="41"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.11133 32.3697V13.7586C6.11133 11.9177 7.60372 10.4253 9.44467 10.4253H21.3891C23.2301 10.4253 24.7224 11.9177 24.7224 13.7586V32.3697C24.7224 34.2107 23.23 35.7031 21.3891 35.7031H9.44466C7.60371 35.7031 6.11133 34.2107 6.11133 32.3697Z"
      stroke="#FAFAFB"
      stroke-width="2"
    />
    <path
      d="M15.4062 10.4255H21.3892C23.2301 10.4255 24.7225 11.9178 24.7225 13.7588V32.3699C24.7225 32.7264 24.6666 33.0697 24.563 33.3918L25.0353 33.5183C26.8135 33.9948 28.6413 32.9395 29.1177 31.1613L33.9346 13.1843C34.4111 11.4061 33.3558 9.57833 31.5776 9.10185L20.0402 6.0104C18.262 5.53393 16.4342 6.58921 15.9577 8.36743L15.4062 10.4255Z"
      stroke="#FAFAFB"
      stroke-width="2"
    />
  </svg> `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  standalone: true,
})
export class PlayRoundButtonComponent {
  constructor(private router: Router) {}
  @Input() roundId: string | undefined;
  playRound(): void {
    if (this.roundId) {
      this.router.navigate(['/', 'play', this.roundId]);
    }
  }
}
