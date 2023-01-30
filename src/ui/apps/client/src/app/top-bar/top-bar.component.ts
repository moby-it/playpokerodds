import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ppo-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private router: Router) {}

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
