-- CreateTable
CREATE TABLE "WiFi" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "WiFi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WiFi" ADD CONSTRAINT "WiFi_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
