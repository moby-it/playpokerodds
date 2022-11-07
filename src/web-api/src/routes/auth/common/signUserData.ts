import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { UserRoles } from 'model';
import { getSecretKey } from './getSecretKey';
export type UserData = Pick<User, 'id' | 'email'> & { role?: UserRoles };
export function signUserData(user: UserData): string {
  return sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role ?? 0,
    },
    getSecretKey(),
    { expiresIn: '4d' }
  );
}
