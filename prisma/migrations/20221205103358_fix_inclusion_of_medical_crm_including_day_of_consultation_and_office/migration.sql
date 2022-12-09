/*
  Warnings:

  - A unique constraint covering the columns `[CRM]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `office` to the `consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CRM` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consultation" ADD COLUMN     "date" TIMESTAMP(3)[],
ADD COLUMN     "office" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "doctor" ADD COLUMN     "CRM" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "specialty" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "doctor_CRM_key" ON "doctor"("CRM");
