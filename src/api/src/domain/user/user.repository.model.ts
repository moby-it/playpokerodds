import { TaskEither } from 'fp-ts/lib/TaskEither';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.model';

export interface UserRepositoryModel {
  readonly create: (dto: CreateUserDto) => TaskEither<Error, User>;
  readonly findOne: (user: Partial<User>) => TaskEither<Error, User>;
  readonly updateOne: (
    userId: string,
    user: Partial<User>
  ) => TaskEither<Error, User>;
}
