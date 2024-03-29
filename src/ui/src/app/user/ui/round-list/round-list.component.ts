import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
  input,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from '@angular/router';
import { PokerOddsStore } from '@app/play/poker-odds.store';
import { ScoreIsAccuratePipe } from '@app/round/helpers';
import { CopyRoundLinkButtonComponent, PlayRoundButtonComponent, PokerTableComponent, RoundResultComponent } from "@app/round/poker-table";
import { UserRoundViewmodel } from '@app/user/models';
import { UserProfileStore } from '@app/user/user-profile.store';
import { tap } from 'rxjs';
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
  imports: [
    CommonModule,
    SuitToSvgPipe,
    ScoreIsAccuratePipe,
    RoundResultComponent,
    PlayRoundButtonComponent,
    CopyRoundLinkButtonComponent,
    PokerTableComponent
  ],
})
export class RoundListComponent implements OnChanges, OnInit {
  constructor(
    private pokerOdds: PokerOddsStore,
    private userProfile: UserProfileStore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const selectedRoundId = params.get('selectedRoundId');
      const selectedRoundIdx = this.rounds().findIndex(
        (r) => r.roundId === selectedRoundId
      );
      if (selectedRoundIdx >= 0) {
        this.selectedRound.set(this.rounds()[selectedRoundIdx]);
      }
    });
  }
  selectedRound = signal<UserRoundViewmodel | null>(null);
  watchingMyOwnProfile = this.userProfile.watchingMyOwnProfile;
  username = this.userProfile.username;
  destroy = inject(DestroyRef);
  rounds = input<UserRoundViewmodel[]>([]);
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
        this.selectRound(this.rounds()[0]);
      }
    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    // if selected round not in new rounds, clear selected round
    const newRounds: UserRoundViewmodel[] = changes['rounds'].currentValue;
    const selectedRound = this.selectedRound();
    if (
      selectedRound &&
      !newRounds.map((r) => r.roundId).includes(selectedRound?.roundId)
    ) {
      this.selectRound(newRounds.length ? newRounds[0] : undefined);
    }
  }
  toggleFavorite(userRound: UserRoundViewmodel, event: Event): void {
    event.stopPropagation();
    if (this.watchingMyOwnProfile()) {
      const op$ = userRound.isFavorite
        ? this.pokerOdds.removeRoundFromFavorites(userRound.roundId)
        : this.pokerOdds.addRoundToFavorites(userRound.roundId);
      this.userProfile.refreshUserProfile();
      op$.pipe(tap(() => this.userProfile.refreshUserProfile())).subscribe();
    }
  }
  userRoundTrackBy(id: number, item: UserRoundViewmodel): string {
    return id + String(item.isFavorite);
  }
}
