-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_email_fkey";

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
