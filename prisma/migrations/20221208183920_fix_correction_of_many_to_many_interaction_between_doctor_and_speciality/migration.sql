/*
  Warnings:

  - You are about to drop the column `typeId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `specialty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'ADMIN', 'DOCTOR');

-- DropForeignKey
ALTER TABLE "specialty" DROP CONSTRAINT "specialty_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_typeId_fkey";

-- DropIndex
DROP INDEX "user_email_key";

-- DropIndex
DROP INDEX "user_password_key";

-- DropIndex
DROP INDEX "user_typeId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "typeId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PATIENT';

-- DropTable
DROP TABLE "specialty";

-- DropTable
DROP TABLE "type_user";

-- CreateTable
CREATE TABLE "speciality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DoctorSpecialitys" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "speciality_id_key" ON "speciality"("id");

-- CreateIndex
CREATE UNIQUE INDEX "speciality_name_key" ON "speciality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_DoctorSpecialitys_AB_unique" ON "_DoctorSpecialitys"("A", "B");

-- CreateIndex
CREATE INDEX "_DoctorSpecialitys_B_index" ON "_DoctorSpecialitys"("B");

-- AddForeignKey
ALTER TABLE "_DoctorSpecialitys" ADD CONSTRAINT "_DoctorSpecialitys_A_fkey" FOREIGN KEY ("A") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorSpecialitys" ADD CONSTRAINT "_DoctorSpecialitys_B_fkey" FOREIGN KEY ("B") REFERENCES "speciality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
