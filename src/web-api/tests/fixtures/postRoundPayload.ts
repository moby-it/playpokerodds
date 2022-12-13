export const postValidRoundPayload1 = {
  myHand: ['5d', 'Jh'],
  opponentsHands: [['..', '..']],
  board: [],
  estimate: 50.45,
};
export const postValidRoundPayload2 = {
  myHand: ['5d', 'Ah'],
  opponentsHands: [['..', '..']],
  board: [],
  estimate: 40.45,
};
export const postRoundInvalidPayload1 = {
  myHand: ['5d', 'Jhhh'],
  opponentsHands: [['..', '.123.']],
  board: [],
  estimate: 50.45,
  someValue: 5,
};
export const postRoundInvalidPayload2 = {};

export const postRoundInvalidPayload3 = {
  myHand: ['5d', 'Jh'],
  opponentsHands: [['..', '..']],
  board: [30],
  estimate: 'fasolakia',
  someValue: 5,
};
