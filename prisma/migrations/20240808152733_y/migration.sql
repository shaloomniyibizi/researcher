/*
  Warnings:

  - You are about to drop the column `departmentId` on the `College` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "College" DROP CONSTRAINT "College_departmentId_fkey";

-- AlterTable
ALTER TABLE "College" DROP COLUMN "departmentId";

-- CreateTable
CREATE TABLE "_CollegeToDepartment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollegeToDepartment_AB_unique" ON "_CollegeToDepartment"("A", "B");

-- CreateIndex
CREATE INDEX "_CollegeToDepartment_B_index" ON "_CollegeToDepartment"("B");

-- AddForeignKey
ALTER TABLE "_CollegeToDepartment" ADD CONSTRAINT "_CollegeToDepartment_A_fkey" FOREIGN KEY ("A") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollegeToDepartment" ADD CONSTRAINT "_CollegeToDepartment_B_fkey" FOREIGN KEY ("B") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
