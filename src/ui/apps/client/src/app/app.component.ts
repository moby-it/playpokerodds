import { Component } from '@angular/core';
import { LoaderService } from '@ppo/shared/ui';
@Component({
  selector: 'ppo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private loaderService: LoaderService) {}
  loading$ = this.loaderService.loading$;
}
