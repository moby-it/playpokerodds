const { calculateEquity } = require('poker-odds');
const { workerData, parentPort } = require('worker_threads');
const equities = calculateEquity(
  [workerData.myHand, ...workerData.opponentsHands],
  workerData.board
);
const equity = equities[0];
const percent = (equity.wins / equity.count) * 100;
parentPort?.postMessage(+percent.toFixed(2));
