/*
  Warnings:

  - The primary key for the `UserFavoriteRounds` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserFavoriteRounds" DROP CONSTRAINT "UserFavoriteRounds_pkey",
ADD CONSTRAINT "UserFavoriteRounds_pkey" PRIMARY KEY ("roundId", "userId");
