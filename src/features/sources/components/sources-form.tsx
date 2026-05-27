"use client";

import { useActionState, useEffect } from "react";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { updateUserSourcesAction } from "../actions/update";

type SourceItem = {
  id: number;
  name: string;
};

/**
 * ソース設定フォーム
 * @param allSources - 選択可能なすべてのソース
 * @param selectedSources - ユーザーが現在選択しているソース
 */
export function SourcesForm({
  allSources,
  selectedSources,
}: {
  allSources: SourceItem[];
  selectedSources: SourceItem[];
}) {
  const [state, formAction] = useActionState(updateUserSourcesAction, null);
  const { showSnackbar } = useSnackbar();

  /** 更新後の処理 */
  useEffect(() => {
    if (state) {
      showSnackbar(state.text, state.type);
    }
  }, [state, showSnackbar]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {allSources.map((source) => (
          <div key={source.id} className="flex items-center p-2">
            <Checkbox
              name="sourceIds"
              value={source.id}
              label={source.name}
              defaultChecked={selectedSources.some((s) => s.id === source.id)}
            />
          </div>
        ))}
      </div>

      <Button type="submit">設定を保存</Button>
    </form>
  );
}
