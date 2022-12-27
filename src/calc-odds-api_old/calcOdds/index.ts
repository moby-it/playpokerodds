import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { calculateOdds, Round } from '@moby-it/ppo-core';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const inputs = Round.decode(req.body?.round);
  if (inputs._tag === 'Left') {
    context.res = {
      status: 400,
      body: 'input hand invalid format',
    };
  } else {
    const odds = calculateOdds(inputs.right);
    context.res = {
      body: { odds },
    };
  }
};

export default httpTrigger;
