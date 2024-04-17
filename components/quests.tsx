"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quests } from "@/constants";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

type Props = {
  points: number;
};

export const Quests = ({ points }: Props) => {
  const onClickViewQuests = () => {
    mixpanel.track("view_quests", {
      current_points: points,
      view_time: new Date().toISOString(),
    });
  };

  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN ?? "");
  }, []);

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href="/quests">
          <Button
            size="sm"
            variant="primaryOutline"
            onClick={onClickViewQuests}
          >
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              className="flex items-center w-full pb-4 gap-x-3"
              key={quest.title}
            >
              <Image src="/points.svg" alt="Points" width={40} height={40} />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
