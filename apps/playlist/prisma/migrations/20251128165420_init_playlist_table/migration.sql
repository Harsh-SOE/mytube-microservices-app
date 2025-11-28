-- CreateTable
CREATE TABLE "Subscribe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscribe_pkey" PRIMARY KEY ("id")
);
