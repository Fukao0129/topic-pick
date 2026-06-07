"use client";

import Image from "next/image";
import { Text } from "@/src/components/ui/text";
import { useSession, signOut } from "next-auth/react";
import { Dropdown } from "@/src/components/ui/dropdown";
import { Button } from "@/src/components/ui/button";

export const HeaderMenu = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <Dropdown
          trigger={
            <Image
              src={session?.user?.image || ""}
              alt="User"
              width={24}
              height={24}
            />
          }
          menu={
            <div>
              <div className="border-b border-secondary/20 p-2">
                <Text size="xs">{session?.user?.name}</Text>
                <Text size="xs" color="secondary" className="mt-1">
                  {session?.user?.email}
                </Text>
              </div>
              <Button
                className="w-full justify-start"
                variant="text"
                color="secondary"
                size="sm"
                onClick={() => signOut()}
              >
                ログアウト
              </Button>
            </div>
          }
        />
      )}
    </>
  );
};
