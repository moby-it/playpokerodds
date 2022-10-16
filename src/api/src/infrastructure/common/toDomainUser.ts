import { User } from '@domain';
import { Round } from '@moby-it/ppo-core';
import { Round as DbRound, User as DbUser } from '@prisma/client';
import * as A from 'fp-ts/Array';
import { isLeft } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { UserWithRound } from 'src/domain/user';
export const toDomainUser = ({ email, id, score, username }: DbUser): User => ({
  email,
  id,
  score: score.toNumber(),
  username,
});
export const toDomainUserWithRounds = ({
  email,
  id,
  score,
  username,
  rounds,
}: DbUser & { rounds: DbRound[] }): UserWithRound => {
  const decodedRounds = rounds.map(r => Round.decode(r));
  if (A.isNonEmpty(decodedRounds.filter(isLeft))) {
    throw new Error('failed to decode user rounds');
  }
  return {
    email,
    id,
    score: score.toNumber(),
    username,
    rounds: pipe(rounds, A.map(Round.decode), A.rights),
  };
};
