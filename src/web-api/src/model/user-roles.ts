import { User, UserRole } from '@prisma/client';

export enum UserRoles {
  SimpleUser,
  Superuser,
  Admin,
}
export function isSuperuser(user: User & { role: UserRole }): boolean {
  if (!user.role) return false;
  return user.role.role >= UserRoles.Superuser;
}
