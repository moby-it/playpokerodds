-- DropForeignKey
ALTER TABLE "Rounds" DROP CONSTRAINT "Rounds_userId_fkey";

-- AddForeignKey
ALTER TABLE "Rounds" ADD CONSTRAINT "Rounds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
