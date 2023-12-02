-- CreateTable
CREATE TABLE "Stores" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "adminID" INTEGER NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUsers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "AdminUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stores" ADD CONSTRAINT "Stores_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "AdminUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
