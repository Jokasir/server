/*
  Warnings:

  - You are about to drop the column `Password` on the `AdminUsers` table. All the data in the column will be lost.
  - Added the required column `password` to the `AdminUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUsers" DROP COLUMN "Password",
ADD COLUMN     "password" TEXT NOT NULL;
