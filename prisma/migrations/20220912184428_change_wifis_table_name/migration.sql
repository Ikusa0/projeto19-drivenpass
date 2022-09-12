/*
  Warnings:

  - You are about to drop the `WiFi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WiFi" DROP CONSTRAINT "WiFi_ownerId_fkey";

-- DropTable
DROP TABLE "WiFi";

-- CreateTable
CREATE TABLE "Wifis" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Wifis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wifis" ADD CONSTRAINT "Wifis_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
