"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

export const Promo = () => {
  const onClickUpgrade = () => {
    mixpanel.track("view_upgrade_options", {
      view_source: "home",
    });
  };

  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN ?? "");
  }, []);

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="Pro" height={26} width={26} />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts and more!</p>
      </div>
      <Button
        asChild
        variant="super"
        className="w-full"
        size="lg"
        onClick={onClickUpgrade}
      >
        <Link href="/shop">Upgrade today</Link>
      </Button>
    </div>
  );
};
