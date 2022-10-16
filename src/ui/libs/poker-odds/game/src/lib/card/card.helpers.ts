import { Card } from '@moby-it/ppo-core';
import * as t from 'io-ts';
const Suit = t.union([
  t.literal('club'),
  t.literal('heart'),
  t.literal('spade'),
  t.literal('diamond'),
]);
type Suit = t.TypeOf<typeof Suit>;
const CardValue = t.union([
  t.literal('1'),
  t.literal('2'),
  t.literal('3'),
  t.literal('4'),
  t.literal('5'),
  t.literal('6'),
  t.literal('7'),
  t.literal('8'),
  t.literal('9'),
  t.literal('10'),
  t.literal('jack'),
  t.literal('queen'),
  t.literal('king'),
]);
type CardValue = t.TypeOf<typeof CardValue>;
function extractSuit(card: Card): Suit {
  switch (card[1]) {
    case 'h':
      return 'heart';
    case 's':
      return 'spade';
    case 'c':
      return 'club';
    case 'd':
      return 'diamond';
    default:
      throw new Error('failed to part card suit');
  }
}
function extractValue(card: Card): CardValue {
  const cardValue = card[0];
  if (Number(cardValue) > 1 && Number(cardValue) < 10) {
    return cardValue as CardValue;
  }
  switch (cardValue) {
    case 'A':
      return '1';
    case 'K':
      return 'king';
    case 'Q':
      return 'queen';
    case 'J':
      return 'jack';
    case 'T':
      return '10';
    default:
      throw new Error('failed to part card value');
  }
}
export function convertToSvgCardLink(card: Card): string {
  return `${extractSuit(card)}_${extractValue(card)}`;
}
