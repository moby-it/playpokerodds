/*
  Warnings:

  - You are about to drop the column `isFavorite` on the `RoundAnswers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RoundAnswers" DROP COLUMN "isFavorite";

-- CreateTable
CREATE TABLE "UserFavoriteRounds" (
    "roundId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserFavoriteRounds_pkey" PRIMARY KEY ("roundId")
);

-- AddForeignKey
ALTER TABLE "UserFavoriteRounds" ADD CONSTRAINT "UserFavoriteRounds_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Rounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteRounds" ADD CONSTRAINT "UserFavoriteRounds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
