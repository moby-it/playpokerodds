import { Round } from '@moby-it/ppo-core';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import { SaveRoundDto } from './dtos/saveRound.dto';

export interface PokerRepositoryModel {
  saveRoundAnswer: (dto: SaveRoundDto) => TaskEither<Error, Round>;
}
