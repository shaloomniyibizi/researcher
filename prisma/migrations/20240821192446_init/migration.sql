-- CreateTable
CREATE TABLE "Promessages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserSystem" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Promessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Promessages" ADD CONSTRAINT "Promessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
