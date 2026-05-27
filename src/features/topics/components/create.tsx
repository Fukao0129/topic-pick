"use client";

import { useActionState, useEffect } from "react";
import { createTopicAction } from "../actions/create";
import { InputField } from "@/src/components/ui/input-field";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { Button } from "@/src/components/ui/button";

/** トピック追加フォーム */
export const CreateTopics = () => {
  const { showSnackbar } = useSnackbar();
  const [state, formAction] = useActionState(createTopicAction, null);

  // 追加後の処理
  useEffect(() => {
    if (state?.type === "success") {
      showSnackbar(state.text, state.type);
    }
  }, [state, showSnackbar]);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <InputField
        defaultValue={state?.values}
        required
        label="トピック名"
        className="flex-1"
        name="topicName"
        errorMessage={state?.type === "error" ? state.text : ""}
      />
      <Button type="submit">追加する</Button>
    </form>
  );
};
