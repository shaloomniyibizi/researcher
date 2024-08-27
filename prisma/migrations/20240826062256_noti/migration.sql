/*
  Warnings:

  - You are about to drop the column `content` on the `notification` table. All the data in the column will be lost.
  - The `status` column on the `notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('read', 'unread');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ProjectUpdate', 'Message', 'Deadline');

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "content",
ADD COLUMN     "message" TEXT,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'Message',
DROP COLUMN "status",
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'unread';

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
