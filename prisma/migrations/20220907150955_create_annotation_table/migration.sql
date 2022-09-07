/*
  Warnings:

  - You are about to alter the column `title` on the `Credentials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Credentials" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "Annotation" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,

    CONSTRAINT "Annotation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Annotation_ownerId_title_key" ON "Annotation"("ownerId", "title");

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
