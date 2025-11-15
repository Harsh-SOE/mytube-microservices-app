-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "commentText" TEXT NOT NULL,
    "commentedByUserId" TEXT NOT NULL,
    "commentedForVideoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
