import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LetModule, PushModule } from '@ngrx/component';
import { PokerOddsFacade } from '@ppo/play/domain';
import { RoundUiModule } from '@ppo/round/ui';
import { UserProfileFacade, UserRoundViewmodel } from '@ppo/user/domain';
import { BehaviorSubject, take, tap } from 'rxjs';
import { SuitToSvgPipe } from './suitToSvg.pipe';

@Component({
  selector: 'ppo-round-list',
  templateUrl: './round-list.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
      }
    `,
  ],
  standalone: true,
  imports: [RoundUiModule, CommonModule, PushModule, LetModule, SuitToSvgPipe],
})
export class RoundListComponent implements OnChanges, OnInit {
  constructor(
    private pokerOdds: PokerOddsFacade,
    private userProfile: UserProfileFacade
  ) {}
  selectedRound$ = new BehaviorSubject<UserRoundViewmodel | null>(null);
  @Input() rounds: UserRoundViewmodel[] = [];
  selectRound(round: UserRoundViewmodel): void {
    this.selectedRound$.next(round);
  }
  ngOnInit(): void {
    if (this.rounds.length) {
      this.selectedRound$.next(this.rounds[0]);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if selected round not in new rounds, clear selected round
    const newRounds: UserRoundViewmodel[] = changes['rounds'].currentValue;
    this.selectedRound$
      .pipe(
        take(1),
        tap((selectedRound) => {
          if (
            selectedRound &&
            !newRounds.map((r) => r.roundId).includes(selectedRound?.roundId)
          ) {
            this.selectedRound$.next(null);
          }
        })
      )
      .subscribe();
  }
  toggleFavorite(userRound: UserRoundViewmodel, event: Event): void {
    event.stopPropagation();
    const op$ = userRound.isFavorite
      ? this.pokerOdds.removeRoundFromFavorites(userRound.roundId)
      : this.pokerOdds.addRoundToFavorites(userRound.roundId);
    op$.pipe(tap(() => this.userProfile.refreshUserProfile())).subscribe();
  }
  userRoundTrackBy(id: number, item: UserRoundViewmodel): string {
    return id + String(item.isFavorite);
  }
}
