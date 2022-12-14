/*
  Warnings:

  - You are about to drop the column `estimate` on the `Rounds` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Rounds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rounds" DROP CONSTRAINT "Rounds_userId_fkey";

-- AlterTable
ALTER TABLE "Rounds" DROP COLUMN "estimate",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "RoundAnswers" (
    "id" TEXT NOT NULL,
    "estimate" DECIMAL(5,2) NOT NULL,
    "userId" TEXT,
    "roundId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoundAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoundAnswers" ADD CONSTRAINT "RoundAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundAnswers" ADD CONSTRAINT "RoundAnswers_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
