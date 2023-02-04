-- DropForeignKey
ALTER TABLE "UserFavoriteRounds" DROP CONSTRAINT "UserFavoriteRounds_roundId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteRounds" DROP CONSTRAINT "UserFavoriteRounds_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserFavoriteRounds" ADD CONSTRAINT "UserFavoriteRounds_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteRounds" ADD CONSTRAINT "UserFavoriteRounds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
