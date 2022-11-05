-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "userRoleId" TEXT;

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userEmail_key" ON "UserRole"("userEmail");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_email_fkey" FOREIGN KEY ("email") REFERENCES "UserRole"("userEmail") ON DELETE RESTRICT ON UPDATE CASCADE;
