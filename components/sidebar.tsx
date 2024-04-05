"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const onClickLeaderBoard = () => {
    try {
      mixpanel.track("leaderboard_viewed", {
        leaderboard_type: "global",
        view_time: new Date().toISOString(),
        current_rank: 5,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN ?? "");
  }, []);

  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
          onClick={onClickLeaderBoard}
        />
        <SidebarItem label="quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="shop" href="/shop" iconSrc="/shop.svg" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
