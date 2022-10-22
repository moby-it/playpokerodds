import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ppo-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(private router: Router) {}
  navigateToPlay(): void {
    this.router.navigate(['/play']);
  }
}
