import { Either } from 'fp-ts/lib/Either';

export interface Command<TResult, TInput> {
  execute: (input: TInput) => Either<Error, TResult>;
}
