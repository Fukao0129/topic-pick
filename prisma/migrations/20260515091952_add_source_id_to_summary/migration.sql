/*
  Warnings:

  - Added the required column `sourceId` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Summary" ADD COLUMN     "sourceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
