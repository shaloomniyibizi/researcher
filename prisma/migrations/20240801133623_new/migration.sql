/*
  Warnings:

  - You are about to drop the column `pdfName` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the `_ChatsToMessages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChatsToMessages" DROP CONSTRAINT "_ChatsToMessages_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatsToMessages" DROP CONSTRAINT "_ChatsToMessages_B_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "pdfName",
DROP COLUMN "pdfUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ChatsToMessages";

-- CreateTable
CREATE TABLE "UserSubscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "stripeCurrentPeriodEnd" TIMESTAMP(3),

    CONSTRAINT "UserSubscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptions_userId_key" ON "UserSubscriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptions_stripeCustomerId_key" ON "UserSubscriptions"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscriptions_stripeSubscriptionId_key" ON "UserSubscriptions"("stripeSubscriptionId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
