/*
  Warnings:

  - You are about to drop the column `objectID` on the `Summary` table. All the data in the column will be lost.
  - Added the required column `originalID` to the `Summary` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Summary_objectID_key";

-- AlterTable
ALTER TABLE "Summary" DROP COLUMN "objectID",
ADD COLUMN     "originalID" TEXT NOT NULL;
