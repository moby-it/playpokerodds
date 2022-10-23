import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ppo-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('demoVideo') video: ElementRef<HTMLVideoElement> | undefined;
  constructor(private router: Router) {}
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
