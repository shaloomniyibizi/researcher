-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "status" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
