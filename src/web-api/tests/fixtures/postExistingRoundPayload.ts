const postValidRoundPayload1 = {
  roundId: 10,
  estimate: 50,
};
const postValidRoundPayload2 = {
  roundId: 10,
  estimate: 40,
};
const postRoundInvalidPayload1 = {
  myHand: ['5d', 'Jhhh'],
  opponentsHands: [['..', '.123.']],
  board: [],
  estimate: '50.45',
  someValue: 5,
};
const postRoundInvalidPayload2 = {};

const postRoundInvalidPayload3 = {
  myHand: ['5d', 'Jh'],
  opponentsHands: [['..', '..']],
  board: [30],
  estimate: 'fasolakia',
  someValue: 5,
};
export const ExistingRoundPayloads = {
  postRoundInvalidPayload1,
  postRoundInvalidPayload2,
  postRoundInvalidPayload3,
  postValidRoundPayload1,
  postValidRoundPayload2,
};
