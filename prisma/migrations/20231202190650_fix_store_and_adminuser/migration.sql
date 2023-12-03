/*
  Warnings:

  - You are about to drop the column `password` on the `Stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdminUsers" ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "Stores" DROP COLUMN "password";
