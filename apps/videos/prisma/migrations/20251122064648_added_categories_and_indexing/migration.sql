/*
  Warnings:

  - You are about to drop the column `videoFileUrl` on the `Video` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoFileIdentifier` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoThumbnailIdentifer` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "videoFileUrl",
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "channelId" TEXT NOT NULL,
ADD COLUMN     "videoFileIdentifier" TEXT NOT NULL,
ADD COLUMN     "videoThumbnailIdentifer" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Video_ownerId_idx" ON "Video"("ownerId");

-- CreateIndex
CREATE INDEX "Video_channelId_idx" ON "Video"("channelId");

-- CreateIndex
CREATE INDEX "Video_categories_idx" ON "Video" USING GIN ("categories");

-- CreateIndex
CREATE INDEX "Video_publishedAt_idx" ON "Video"("publishedAt");
