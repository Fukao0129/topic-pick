"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/src/components/ui/icon";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const translateMapping: Record<string, string> = {
  home: "ホーム",
  favorites: "お気に入り",
  topics: "トピック",
  sources: "ソース",
};

export function Breadcrumb() {
  // URLからパンくずリストを生成
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const list = ["home", ...segments];

  return (
    <nav className="flex gap-1 text-sm">
      {list.map((segment, index) => (
        <div key={index} className="flex items-baseline gap-1">
          <Icon icon={index === 0 ? faHouse : faAngleRight} size="xs" />
          <Link
            href={index === 0 ? "/" : `/${segments.slice(0, index).join("/")}`}
            className="hover:underline"
          >
            {translateMapping[segment] || segment}
          </Link>
        </div>
      ))}
    </nav>
  );
}
