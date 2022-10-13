/*
  Warnings:

  - You are about to alter the column `odds` on the `Rounds` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `estimate` on the `Rounds` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Rounds" ALTER COLUMN "odds" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "estimate" SET DATA TYPE DECIMAL(10,2);
