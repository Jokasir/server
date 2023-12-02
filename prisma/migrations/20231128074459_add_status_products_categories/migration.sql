-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
