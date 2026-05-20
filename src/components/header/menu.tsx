"use client";

import Image from "next/image";
import Link from "next/link";
import { Text } from "@/src/components/ui/text";
import { useSession } from "next-auth/react";

export const HeaderMenu = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Image
            src={session?.user?.image || ""}
            alt="User"
            width={24}
            height={24}
          />
          {/* <Text size="xs">{session?.user?.name}</Text>
          <Text size="xs" color="secondary">
            {session?.user?.email}
          </Text> */}
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
};
