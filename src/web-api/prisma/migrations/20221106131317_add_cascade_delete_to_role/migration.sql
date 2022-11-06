-- DropForeignKey
ALTER TABLE "UserRoles" DROP CONSTRAINT "UserRoles_userEmail_fkey";

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
