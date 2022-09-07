/*
  Warnings:

  - You are about to drop the `Annotation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Annotation" DROP CONSTRAINT "Annotation_ownerId_fkey";

-- DropTable
DROP TABLE "Annotation";

-- CreateTable
CREATE TABLE "Annotations" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,

    CONSTRAINT "Annotations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Annotations_ownerId_title_key" ON "Annotations"("ownerId", "title");

-- AddForeignKey
ALTER TABLE "Annotations" ADD CONSTRAINT "Annotations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
