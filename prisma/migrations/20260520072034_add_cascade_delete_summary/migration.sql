-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_topicId_fkey";

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
