import { Component } from '@angular/core';

@Component({
  selector: 'ppo-footer',
  template: `
    <div class="footer" id="footer">
      <div>
        <img src="assets/game.svg" width="25" height="25" alt="" srcset="" />
        <span>
          PlayPokerOdds © is an collaborative idea of
          <a href="https://moby-it.com" target="_blank">Moby IT</a> and
          <a href="https://www.linkedin.com/in/farazbarmpar/" target="_blank"
            >Faraz Barbar</a
          >. Application developed by
          <a href="https://moby-it.com" target="_blank">Moby IT</a>. Icons used
          are imported from
          <a href="https://iconoir.com/" target="_blank">iconnoir</a>, an open
          source icon library licenced under MIT.
        </span>
      </div>
    </div>
  `,
})
export class FooterComponent {}
