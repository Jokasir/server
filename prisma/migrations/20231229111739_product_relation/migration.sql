-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
