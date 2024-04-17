"use client";

import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { courses } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  points,
  hearts,
  hasActiveSubscription,
}: Props) => {
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      mixpanel.identify(user?.id);
      mixpanel.people.set({
        plan: "Premium",
        $name: user?.fullName,
        $email: user?.primaryEmailAddress?.emailAddress,
      });
    }
  }, [user]);

  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN ?? "");
  }, []);

  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            height={22}
            width={22}
            alt="Hearts"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
