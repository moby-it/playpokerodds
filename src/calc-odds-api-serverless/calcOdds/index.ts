import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { calculateOdds, validateRound } from '@moby-it/ppo-core';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const round = req.body?.round;
  if (!validateRound(round)) {
    context.res = {
      status: 400,
      body: 'input hand invalid format',
    };
    return;
  }
  const odds = calculateOdds(round);
  context.res = {
    body: odds,
  };
};

export default httpTrigger;
