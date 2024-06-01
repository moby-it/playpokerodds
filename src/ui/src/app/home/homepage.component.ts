import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ppo-homepage',
  template: `
    <div class="homepage-content">
    <h1 class="title">Play Poker Odds!</h1>
    <img class="demo" src="/assets/demo.gif" alt="How to play" />
    <h3 class="moto">Forget about bets. Focus on winning chances</h3>
    <button class="primary md" (click)="navigateToPlay()">Play now</button>
    </div>
  `,
  styles: [`
  :host {
    flex-grow: 1;
    min-height: 100vh;
  }
  .homepage-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  .title,
  .moto {
    text-align: center;
  }
  .demo {
    width: 650px;
    border-radius: var(--radius);
    height: 531px;
  }
  `],
  standalone: true
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('demoVideo') video: ElementRef<HTMLVideoElement> | undefined;
  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    if (this.video) {
      this.video.nativeElement.muted = true;
      this.video.nativeElement.play();
    }
  }
  navigateToPlay(): void {
    this.router.navigate(['/play']);
  }
}
