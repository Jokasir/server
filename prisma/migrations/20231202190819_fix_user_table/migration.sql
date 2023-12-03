/*
  Warnings:

  - You are about to drop the `AdminUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stores" DROP CONSTRAINT "Stores_adminID_fkey";

-- DropTable
DROP TABLE "AdminUsers";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stores" ADD CONSTRAINT "Stores_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
