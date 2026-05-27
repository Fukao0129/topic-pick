"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const headerItems = [
  { href: "/", label: "ホーム" },
  { href: "/favorites", label: "お気に入り" },
  { href: "/topics", label: "トピック" },
  { href: "/sources", label: "ソース" },
];

/** ヘッダーナビゲーションコンポーネント */
export const HeaderNav = () => {
  // アクティブ状態の判定
  const pathName = usePathname();
  const isActive = (href: string) => pathName === href;
  const activeClasses = "bg-foreground text-white";

  return (
    <nav className="bg-white rounded-2xl border-b p-1 border-secondary-subtle flex justify-around sm:justify-center items-center shadow-md">
      {headerItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${isActive(item.href) ? activeClasses : ""} block px-4 py-2 rounded-2xl hover:bg-secondary-subtle transition-colors duration-200`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
