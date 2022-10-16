import { CreateUserDto, User, UserRepositoryModel } from '@domain';
import { prisma } from '@infrastructure';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { handleDbError, toDomainUser, toDomainUserWithRounds } from './common';
const create = ({
  email,
  hash,
  salt,
  username,
}: CreateUserDto): TaskEither<Error, User> =>
  tryCatch(async () => {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        salt,
        hash,
      },
    });
    return toDomainUser(user);
  }, handleDbError);

const findOne = (user: Partial<User>): TaskEither<Error, User> =>
  tryCatch(async () => {
    const result = await prisma.user.findFirst({
      where: user,
      include: { rounds: true },
    });
    if (!result) throw new Error('user was not found');
    return toDomainUserWithRounds(result);
  }, handleDbError);

const updateOne = (userId: string, user: Partial<User>) =>
  tryCatch(async () => {
    const result = await prisma.user.update({
      data: user,
      where: { id: userId },
    });
    return toDomainUser(result);
  }, handleDbError);

export const UserRepository: UserRepositoryModel = {
  create,
  findOne,
  updateOne,
} as const;
