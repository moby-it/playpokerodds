import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderComponent, LoaderService } from '@ppo/shared/ui';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
@Component({
  selector: 'ppo-root',
  imports: [TopBarComponent, RouterModule, LoaderComponent, PushPipe],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AppComponent {
  constructor(private loaderService: LoaderService) { }
  loading$ = this.loaderService.loading$;
}
