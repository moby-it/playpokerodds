import { Component } from '@angular/core';

@Component({
  selector: 'ppo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    localStorage.clear();
  }
}
