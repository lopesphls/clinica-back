/*
  Warnings:

  - You are about to drop the column `doctorId` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `month` to the `consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `consultation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `consultation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "consultation" DROP CONSTRAINT "consultation_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "consultation" DROP CONSTRAINT "consultation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "doctor" DROP CONSTRAINT "doctor_userId_fkey";

-- DropForeignKey
ALTER TABLE "patient" DROP CONSTRAINT "patient_userId_fkey";

-- DropIndex
DROP INDEX "doctor_userId_key";

-- DropIndex
DROP INDEX "patient_birth_date_key";

-- DropIndex
DROP INDEX "patient_userId_key";

-- AlterTable
ALTER TABLE "consultation" DROP COLUMN "doctorId",
DROP COLUMN "patientId",
ADD COLUMN     "hours" INTEGER[],
ADD COLUMN     "minutes" INTEGER[],
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" INTEGER NOT NULL,
ALTER COLUMN "office" DROP NOT NULL;

-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "patient" DROP COLUMN "birth_date",
DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "_logInPatient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_logInDoctor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConsultationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_logInPatient_AB_unique" ON "_logInPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_logInPatient_B_index" ON "_logInPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_logInDoctor_AB_unique" ON "_logInDoctor"("A", "B");

-- CreateIndex
CREATE INDEX "_logInDoctor_B_index" ON "_logInDoctor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConsultationToUser_AB_unique" ON "_ConsultationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConsultationToUser_B_index" ON "_ConsultationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "_logInPatient" ADD CONSTRAINT "_logInPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_logInPatient" ADD CONSTRAINT "_logInPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_logInDoctor" ADD CONSTRAINT "_logInDoctor_A_fkey" FOREIGN KEY ("A") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_logInDoctor" ADD CONSTRAINT "_logInDoctor_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsultationToUser" ADD CONSTRAINT "_ConsultationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsultationToUser" ADD CONSTRAINT "_ConsultationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
