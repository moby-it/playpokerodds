import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ppo-round-result',
  templateUrl: './round-result.component.html',
})
export class RoundResultComponent implements OnInit {
  headerClass = 'lg';
  bodyClass = 'sm';
  @Input() size: 'lg' | 'md' = 'md';
  @Input() header: string | number | undefined | null;
  @Input() body: string | number | undefined | null;
  @Input() classes: string[] = [];
  ngOnInit(): void {
    if (this.size === 'lg') {
      this.headerClass = 'xl';
      this.bodyClass = 'md'
    }
  }
}
