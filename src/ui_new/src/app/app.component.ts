import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { LoaderService } from './shared/ui/loader/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, LoaderComponent, AsyncPipe],
  template: `
  <ppo-top-bar></ppo-top-bar>
  <router-outlet></router-outlet>
  @if (loading$ | async) {
    <ppo-loader></ppo-loader>
  }
  `,
})
export class AppComponent {
  constructor(private loaderService: LoaderService) { }
  loading$ = this.loaderService.loading$;
}
