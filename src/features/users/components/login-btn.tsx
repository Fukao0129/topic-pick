"use client";

import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const LoginBtn = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <Button
        color="secondary"
        variant="outlined"
        className="flex items-center gap-1"
        onClick={() => signIn("github", { redirectTo: "/" })}
      >
        <Icon icon={faGithub} size="large" />
        ログイン
      </Button>
    </div>
  );
};
