/*
  Warnings:

  - You are about to drop the `UserSubscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserSubscriptions";

-- CreateTable
CREATE TABLE "ResearchTopics" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "problemStatement" TEXT NOT NULL,
    "solution" TEXT,
    "objectives" TEXT,
    "feactures" TEXT,
    "conclution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResearchTopics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResearchTopics" ADD CONSTRAINT "ResearchTopics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
