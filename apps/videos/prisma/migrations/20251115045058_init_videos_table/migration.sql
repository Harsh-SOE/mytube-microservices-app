-- CreateEnum
CREATE TYPE "VideoPersistancePublishStatus" AS ENUM ('PENDING', 'PROCESSING', 'PROCESSED', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "VideoPersistanceVisibilityStatus" AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoFileUrl" TEXT NOT NULL,
    "description" TEXT,
    "videoPublishStatus" "VideoPersistancePublishStatus" NOT NULL DEFAULT 'PENDING',
    "videoVisibiltyStatus" "VideoPersistanceVisibilityStatus" NOT NULL DEFAULT 'PRIVATE',
    "ownerId" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
