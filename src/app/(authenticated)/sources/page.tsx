import {
  getSources,
  getUserSources,
  SourcesForm,
} from "@/src/features/sources";
import { Card } from "@/src/components/ui/card";
import { Title } from "@/src/components/page-header/title";
import { requireAuth } from "@/src/lib/utils/require-auth";

const PAGE_TITLE = "ソース";

export const metadata = {
  title: `${PAGE_TITLE} | ${process.env.APP_NAME}`,
};

export default async function SourcesPage() {
  const userId = await requireAuth();

  /** ソース一覧を取得 */
  const allSources = await getSources();

  /** 選択中のソースを取得 */
  const selectedSources = await getUserSources(userId);

  return (
    <div className="flex flex-col gap-6">
      <Title
        title={PAGE_TITLE}
        description="サマリを生成するためのニュースの情報源を選択してください。（最低1つ以上）"
      />

      <Card className="p-6">
        <SourcesForm
          allSources={allSources}
          selectedSources={selectedSources}
        />
      </Card>
    </div>
  );
}
