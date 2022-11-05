/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userEmail_fkey";

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "UserRoles" (
    "id" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_userEmail_key" ON "UserRoles"("userEmail");

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
