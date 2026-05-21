import Link from "next/link";
import Image from "next/image";
import { HeaderMenu } from "./menu";
import { HeaderNav } from "./nav";

export const Header = () => {
  return (
    <header className="p-4 grid grid-cols-[1fr_auto] sm:flex sm:justify-between sm:items-center gap-4">
      <Link href="/">
        <Image
          src="/icon.svg"
          alt={process.env.APP_NAME || "TopicPick"}
          width={150}
          height={35}
        />
      </Link>

      <div className="sm:order-last">
        <HeaderMenu />
      </div>

      <div className="col-span-2 sm:col-auto">
        <HeaderNav />
      </div>
    </header>
  );
};
