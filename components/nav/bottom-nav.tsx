"use server";

import { headers } from "next/headers";
import Link from "next/link";
import {
  ClipboardEdit,
  Home,
  MoreHorizontal,
  TrendingUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const pathname = headers().get("x-pathname") ?? "";
  const isHome = pathname === "/";
  const isTrending = pathname === "/cars/compare";

  return (
    <footer className="content-grid z-bottom-nav h-bottom-nav fixed bottom-0 w-full border-t bg-white">
      <nav className="content flex justify-around">
        <Link
          href="/"
          className="flex flex-1 flex-col items-center justify-center gap-1"
        >
          <Home className={cn("opacity-50", isHome && "opacity-100")} />
          <span
            className={cn(
              "text-xs opacity-50",
              isHome && "font-bold opacity-100"
            )}
          >
            충전소 찾기
          </span>
        </Link>
        <Link
          href="/cars/compare"
          className="flex flex-1 flex-col items-center justify-center gap-1"
        >
          <TrendingUpIcon
            className={cn("opacity-50", isTrending && "opacity-100")}
          />
          <span
            className={cn(
              "text-xs opacity-50",
              isTrending && "font-bold opacity-100"
            )}
          >
            전기차 비교
          </span>
        </Link>
      </nav>
    </footer>
  );
};

export default BottomNav;
