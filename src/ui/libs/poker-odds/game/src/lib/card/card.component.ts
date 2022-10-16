import { Component, Input, OnInit } from '@angular/core';
import { Card } from '@moby-it/ppo-core';
import { convertToSvgCardLink } from './card.helpers';
@Component({
  selector: 'ppo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() back = false;
  @Input() card: Card | undefined;
  cardLink = 'svg-cards.svg#';
  ngOnInit() {
    if (this.back) {
      this.cardLink += 'back';
    } else {
      if (!this.card)
        throw new Error('cannot render releaved card with undefined value');
      this.cardLink += convertToSvgCardLink(this.card);
    }
  }
}
