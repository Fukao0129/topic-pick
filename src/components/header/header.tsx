import Link from "next/link";
import Image from "next/image";
import { HeaderMenu } from "./menu";
import { HeaderNav } from "./nav";

export const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center gap-4">
      <Link href="/">
        <Image
          src="/icon.svg"
          alt={process.env.APP_NAME || "TopicPick"}
          width={150}
          height={35}
        />
      </Link>

      <HeaderNav />

      <HeaderMenu />
    </header>
  );
};
