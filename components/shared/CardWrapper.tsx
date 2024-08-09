"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Social } from "@/components/shared/Social";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  label: string;
  backLabel: string;
  backHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  label,
  backLabel,
  backHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <h1 className="text-3xl font-semibold">🔐 Smart Research</h1>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <Button
          className="w-full font-normal"
          variant={"link"}
          size={"sm"}
          asChild
        >
          <Link href={backHref}>{backLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
