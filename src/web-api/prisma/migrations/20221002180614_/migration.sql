/*
  Warnings:

  - You are about to alter the column `odds` on the `Rounds` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(2,2)`.
  - You are about to alter the column `estimate` on the `Rounds` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(2,2)`.

*/
-- AlterTable
ALTER TABLE "Rounds" ALTER COLUMN "odds" SET DATA TYPE DECIMAL(2,2),
ALTER COLUMN "estimate" SET DATA TYPE DECIMAL(2,2);
