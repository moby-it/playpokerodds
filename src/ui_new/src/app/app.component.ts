import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Hello from play poker odds</h1>
  `
})
export class AppComponent {
  title = 'ui_new';
}
