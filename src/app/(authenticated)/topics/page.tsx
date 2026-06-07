import { CreateTopics, Topics } from "@/src/features/topics";
import { Title } from "@/src/components/page-header/title";

const PAGE_TITLE = "トピック";

export const metadata = {
  title: PAGE_TITLE,
};

export default function TopicsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Title
        title={PAGE_TITLE}
        description="キャッチアップしたいトピックを単語で登録してください。（2文字以上10文字以内）"
      />
      <CreateTopics />
      <Topics />
    </div>
  );
}
