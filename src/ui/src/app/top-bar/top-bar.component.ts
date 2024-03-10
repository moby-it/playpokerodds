import { Component } from '@angular/core';
import { UserStatusComponent } from './user-status/user-status.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'ppo-top-bar',
  imports: [UserStatusComponent, RouterModule],
  templateUrl: './top-bar.component.html',
  styles: [`
    :host {
        display: block;
        z-index: 10;
        }
`],
  standalone: true
})
export class TopBarComponent { }
