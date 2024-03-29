import { Clipboard } from '@angular/cdk/clipboard';

import { Component, Input, input } from '@angular/core';
import { createRouteUrl } from '@app/round/helpers';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ppo-copy-round-link-button',
  template: ` <svg
    ppoTooltip="Copy Link"
    fontSize="14"
    (click)="copyToClipboard()"
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.833 19.996C23.833 15.8431 19.9713 11.6666 15.2616 11.6666C14.7037 11.6666 12.8647 11.6666 12.4044 11.6666C7.67057 11.6666 3.83301 15.3958 3.83301 19.996C3.83301 23.96 6.68256 27.2773 10.4997 28.119C11.1123 28.2541 11.7498 28.3253 12.4044 28.3253"
      stroke="#FAFAFB"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.167 19.996C17.167 24.1488 21.0287 28.3253 25.7385 28.3253C26.2963 28.3253 28.1353 28.3253 28.5955 28.3253C33.3295 28.3253 37.167 24.5961 37.167 19.996C37.167 16.032 34.3175 12.7147 30.5003 11.873C29.8877 11.7379 29.2502 11.6666 28.5955 11.6666"
      stroke="#FAFAFB"
      stroke-width="2.5"
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
})
export class CopyRoundLinkButtonComponent {
  roundId = input<string>();
  constructor(private clipboard: Clipboard, private toaster: ToastrService) { }
  copyToClipboard(): void {
    if (this.roundId()) {
      const url = createRouteUrl(this.roundId() as string);
      this.clipboard.copy(url);
      this.toaster.info('Link copied', '', { timeOut: 2000 });
    }
  }
}
