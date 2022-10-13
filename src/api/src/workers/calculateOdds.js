const { calculateOdds } = require('@moby-it/ppo-core');
const { workerData, parentPort } = require('worker_threads');
parentPort?.postMessage(calculateOdds(workerData));
