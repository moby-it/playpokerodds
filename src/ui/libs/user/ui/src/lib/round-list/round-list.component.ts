import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule, PushModule } from '@ngrx/component';
import { PokerOddsFacade } from '@ppo/play/domain';
import { ScoreIsAccuratePipe } from '@ppo/round/domain';
import { RoundUiModule } from '@ppo/round/ui';
import { UserProfileFacade, UserRoundViewmodel } from '@ppo/user/domain';
import { BehaviorSubject, filter, switchMap, take, tap } from 'rxjs';
import { SuitToSvgPipe } from './suitToSvg.pipe';
@UntilDestroy()
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
  imports: [
    RoundUiModule,
    CommonModule,
    PushModule,
    LetModule,
    SuitToSvgPipe,
    ScoreIsAccuratePipe,
  ],
})
export class RoundListComponent implements OnChanges, OnInit {
  constructor(
    private pokerOdds: PokerOddsFacade,
    private userProfile: UserProfileFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  selectedRound$ = new BehaviorSubject<UserRoundViewmodel | null>(null);
  watchingMyOwnmProfile$ = this.userProfile.watchingMyOwnProfile$;
  username$ = this.userProfile.username$;
  @Input() rounds: UserRoundViewmodel[] = [];
  selectRound(round?: UserRoundViewmodel): void {
    if (!round) {
      this.router.navigate([], { relativeTo: this.route });
    } else {
      this.router.navigate([], {
        queryParams: {
          selectedRoundId: round.roundId,
        },
        relativeTo: this.route,
      });
    }
  }
  ngOnInit(): void {
    if (this.rounds.length) {
      if (!this.route.snapshot.queryParamMap.has('selectedRoundId')) {
        this.selectRound(this.rounds[0]);
      }
    }
    this.route.queryParamMap.pipe(untilDestroyed(this)).subscribe((params) => {
      const selectedRoundId = params.get('selectedRoundId');
      const selectedRoundIdx = this.rounds.findIndex(
        (r) => r.roundId === selectedRoundId
      );
      if (selectedRoundIdx >= 0) {
        this.selectedRound$.next(this.rounds[selectedRoundIdx]);
      }
    });
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
            this.selectRound(newRounds.length ? newRounds[0] : undefined);
          }
        })
      )
      .subscribe();
  }
  toggleFavorite(userRound: UserRoundViewmodel, event: Event): void {
    event.stopPropagation();
    this.watchingMyOwnmProfile$
      .pipe(
        take(1),
        filter(Boolean),
        switchMap(() => {
          const op$ = userRound.isFavorite
            ? this.pokerOdds.removeRoundFromFavorites(userRound.roundId)
            : this.pokerOdds.addRoundToFavorites(userRound.roundId);
          return op$.pipe(tap(() => this.userProfile.refreshUserProfile()));
        })
      )
      .subscribe();
  }
  userRoundTrackBy(id: number, item: UserRoundViewmodel): string {
    return id + String(item.isFavorite);
  }
}
