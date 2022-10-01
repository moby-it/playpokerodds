import * as t from 'io-ts';

export const Spade = t.union([
  t.literal('As'),
  t.literal('Ks'),
  t.literal('Qs'),
  t.literal('Qs'),
  t.literal('Js'),
  t.literal('Ts'),
  t.literal('9s'),
  t.literal('8s'),
  t.literal('7s'),
  t.literal('6s'),
  t.literal('5s'),
  t.literal('4s'),
  t.literal('3s'),
  t.literal('2s'),
]);
export type Spade = t.TypeOf<typeof Spade>;
export const Heart = t.union([
  t.literal('Ah'),
  t.literal('Kh'),
  t.literal('Qh'),
  t.literal('Qh'),
  t.literal('Jh'),
  t.literal('Th'),
  t.literal('9h'),
  t.literal('8h'),
  t.literal('7h'),

  t.literal('6h'),
  t.literal('5h'),
  t.literal('4h'),
  t.literal('3h'),
  t.literal('2h'),
]);
export type Heart = t.TypeOf<typeof Heart>;
export const Club = t.union([
  t.literal('Ac'),
  t.literal('Kc'),
  t.literal('Qc'),
  t.literal('Qc'),
  t.literal('Jc'),
  t.literal('Tc'),
  t.literal('9c'),
  t.literal('8c'),
  t.literal('7c'),

  t.literal('6c'),
  t.literal('5c'),
  t.literal('4c'),
  t.literal('3c'),
  t.literal('2c'),
]);
export type Club = t.TypeOf<typeof Club>;
export const Diamond = t.union([
  t.literal('Ad'),
  t.literal('Kd'),
  t.literal('Qd'),
  t.literal('Qd'),
  t.literal('Jd'),
  t.literal('Td'),
  t.literal('9d'),
  t.literal('8d'),
  t.literal('7d'),
  t.literal('6d'),
  t.literal('5d'),
  t.literal('4d'),
  t.literal('3d'),
  t.literal('2d'),
]);
export type Diamond = t.TypeOf<typeof Diamond>;

export const UnknownCard = t.literal('..');
export type UnknownCard = t.TypeOf<typeof UnknownCard>;
export const Card = t.union([Spade, Heart, Club, Diamond, UnknownCard]);
export type Card = t.TypeOf<typeof Card>;
