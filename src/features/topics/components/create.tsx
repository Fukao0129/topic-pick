"use client";

import { useActionState } from "react";
import { createTopicAction } from "../actions/create";
import { InputField } from "@/src/components/ui/input-field";
import { Button } from "@/src/components/ui/button";

export const CreateTopics = () => {
  const [state, formAction] = useActionState(createTopicAction, null);

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
