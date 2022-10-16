import { Either } from 'fp-ts/lib/Either';

export interface Query<TResult, TInput> {
  execute: (input: TInput) => Either<Error, TResult>;
}
