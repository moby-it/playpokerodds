import { Component } from '@angular/core';
import { AuthFacade } from '@gtop-ui/auth/data-access';

@Component({
  selector: 'gtop-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authFacade: AuthFacade) {}
  status$ = this.authFacade.status$;
}
