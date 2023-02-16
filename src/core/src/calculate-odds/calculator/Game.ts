// @ts-nocheck
import { Input, HandRanks, CardGroup, Deck, BestHand, Stats } from './types';
import {
  cleanInput,
  validateInput,
  shuffle,
  calculateMaxIterations,
} from './util';
import { evaluate } from './evaluate';

class Player {
  dealt = new CardGroup();
  bestHand: BestHand;

  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  evaluate(board: CardGroup) {
    const totalCardGroup = new CardGroup(this.dealt.cards.concat(board.cards));
    this.bestHand = evaluate(totalCardGroup);

    return this.bestHand;
  }

  compare(p: Player) {
    if (p.bestHand.handRank === this.bestHand.handRank) {
      for (let i = 0; i < this.bestHand.hand.cards.length; i++) {
        if (
          p.bestHand.hand.cards[i].rank !== this.bestHand.hand.cards[i].rank
        ) {
          return p.bestHand.hand.cards[i].rank >
            this.bestHand.hand.cards[i].rank
            ? 1
            : -1;
        }
      }
      return 0;
    }

    return p.bestHand.handRank > this.bestHand.handRank ? 1 : -1;
  }
}

class Game {
  private input: Input;
  private board: CardGroup;
  private deck: Deck;
  private excludedBoardCards: CardGroup[];
  private shouldRemoveExcludedCards = false;
  private maxIterations: number;
  players: Player[] = [];

  constructor(input: Input, excludedBoardCards: CardGroup[]) {
    this.input = input;
    this.excludedBoardCards = excludedBoardCards;
    this.maxIterations = calculateMaxIterations(this.input);
    if (this.maxIterations < input.iterations) {
      this.shouldRemoveExcludedCards = true;
    }
    this.deck = new Deck(this.input.numDecks);
    this.deck.shuffle();

    this.buildKnownBoard();
    this.dealKnownCards();
    this.buildRestOfBoard();
    this.dealRestOfCards();
  }

  static getNpcName(i: number) {
    return `NPC ${i}`;
  }

  play(): Player[] {
    for (const p of this.players) {
      p.evaluate(this.board);
    }

    // shuffle player order. allows bias when compare() return 0 as ties
    shuffle(this.players);
    // compare hands
    this.players.sort((a, b) => a.compare(b));

    const winners: Player[] = [this.players[0]];
    for (let i = 1; i < this.players.length; i++) {
      const res = this.players[i - 1].compare(this.players[i]);
      if (res === 0) {
        winners.push(this.players[i]);
      } else {
        break;
      }
    }

    return winners;
  }

  private buildKnownBoard() {
    this.board = new CardGroup(this.input.board);
    this.board.cards.forEach((c) => this.deck.removeCard(c));
  }
  private buildRestOfBoard() {
    const currentBoardSize = this.board.cards.length;
    const boardCards = new CardGroup();
    for (let i = 0; i < this.input.boardSize - currentBoardSize; i++) {
      const card = this.deck.pop();
      boardCards.addCards(card);
    }
    if (this.shouldRemoveExcludedCards) {
      if (this.excludedBoardCards.some((c) => c.equals(boardCards))) {
        this.buildRestOfBoard();
      } else {
        this.board.addCardGroup(boardCards);
        this.excludedBoardCards.push(boardCards);
        return;
      }
    } else {
      this.board.addCardGroup(boardCards);
    }
  }

  private dealKnownCards() {
    for (const s of this.input.hands) {
      const dealtCards = new CardGroup(s);
      dealtCards.cards.forEach((c) => this.deck.removeCard(c));

      const p = new Player(dealtCards.toString());
      p.dealt.addCardGroup(dealtCards);
      this.players.push(p);
    }
  }
  private dealRestOfCards() {
    // complete any incomplete players
    for (const p of this.players) {
      for (let i = 0; i < this.input.handSize - p.dealt.cards.length; i++) {
        p.dealt.addCards(this.deck.pop());
      }
    }

    for (let i = 0; i < this.input.numPlayers - this.input.hands.length; i++) {
      const dealtCards = new CardGroup();
      for (let j = 0; j < this.input.handSize; j++) {
        dealtCards.addCards(this.deck.pop());
      }

      const p = new Player(Game.getNpcName(i + 1));
      p.dealt.addCardGroup(dealtCards);
      this.players.push(p);
    }
  }
}

export class Calculator {
  private stats: Record<string, Partial<Stats>> = {};
  private input: Input;
  excludedBoardCards: CardGroup[] = [];
  excludedHandCards: CardGroup[] = [];
  iterations = 0;
  constructor(input: Input) {
    validateInput(input);
    cleanInput(input);

    this.input = input;

    for (const e of this.input.hands) {
      this.setupStatsObj(e);
    }

    for (let i = 0; i < this.input.numPlayers - this.input.hands.length; i++) {
      this.setupStatsObj(Game.getNpcName(i + 1));
    }
  }

  simulate() {
    const maxIterations = calculateMaxIterations(this.input);
    for (
      let i = 0;
      i < this.input.iterations &&
      this.excludedBoardCards.length < maxIterations;
      i++
    ) {
      const g = new Game(this.input, this.excludedBoardCards);
      const winners = g.play();
      this.addToCount(winners);
      this.iterations++;
    }

    this.calculateStats();

    return this.stats;
  }

  private addToCount(winners: Player[]) {
    if (winners.length > 1) {
      for (const winner of winners) {
        this.stats[winner.name].tieCount++;
        if (this.input.returnTieHandStats)
          this.stats[winner.name].tieHandStats[
            HandRanks[winner.bestHand.handRank]
          ].count++;
      }
    } else {
      for (const winner of winners) {
        this.stats[winner.name].winCount++;
        if (this.input.returnHandStats)
          this.stats[winner.name].handStats[HandRanks[winner.bestHand.handRank]]
            .count++;
      }
    }
  }

  private calculateStats() {
    for (const name in this.stats) {
      // winner percent
      this.stats[name].winPercent = this.calculatePercent(
        this.stats[name].winCount
      );
      this.stats[name].tiePercent = this.calculatePercent(
        this.stats[name].tieCount
      );

      // hand percent
      if (this.input.returnHandStats) {
        for (const rank in this.stats[name].handStats) {
          this.stats[name].handStats[rank].percent = this.calculatePercent(
            this.stats[name].handStats[rank].count
          );
        }
      }
      if (this.input.returnTieHandStats) {
        for (const rank in this.stats[name].tieHandStats) {
          this.stats[name].tieHandStats[rank].percent = this.calculatePercent(
            this.stats[name].tieHandStats[rank].count
          );
        }
      }
    }
  }

  private setupStatsObj(name: string) {
    this.stats[name] = { winCount: 0, tieCount: 0 };
    if (this.input.returnHandStats) this.stats[name].handStats = {};
    if (this.input.returnTieHandStats) this.stats[name].tieHandStats = {};

    for (const r in HandRanks) {
      if (typeof HandRanks[r] !== 'number') continue;

      if (this.input.returnHandStats)
        this.stats[name].handStats[r] = <any>{ count: 0 };
      if (this.input.returnTieHandStats)
        this.stats[name].tieHandStats[r] = <any>{ count: 0 };
    }
  }

  private calculatePercent(count: number) {
    return +((count / this.iterations) * 100).toFixed(4);
  }
}
