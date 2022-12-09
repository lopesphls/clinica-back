/*
  Warnings:

  - You are about to drop the column `specialtyId` on the `doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId]` on the table `specialty` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "doctor" DROP CONSTRAINT "doctor_specialtyId_fkey";

-- DropIndex
DROP INDEX "doctor_name_key";

-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "specialtyId";

-- AlterTable
ALTER TABLE "specialty" ADD COLUMN     "doctorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "specialty_doctorId_key" ON "specialty"("doctorId");

-- AddForeignKey
ALTER TABLE "specialty" ADD CONSTRAINT "specialty_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
