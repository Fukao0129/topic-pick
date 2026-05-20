// クライアントコンポーネントで useSession を使うために必要
// https://next-auth.js.org/getting-started/example#configure-shared-session-state

"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
