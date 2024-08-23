"use client";
import SkeletonWrapper from "@/components/shared/SkeletonWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import CountUp from "react-countup";
import {
  GetaNumberOfAcceptedProjects,
  GetaNumberOfPendingProjects,
  GetaNumberOfProjects,
  GetaNumberOfRejectedProjects,
} from "../projects/_actions/project.actions";

export const StatsCards = () => {
  const { data: number, isFetching } = useQuery({
    queryKey: ["allprojects", "projects"],
    queryFn: async () => await GetaNumberOfProjects(),
  });
  const { data: accepted } = useQuery({
    queryKey: ["acceptedProject", "projects"],
    queryFn: async () => await GetaNumberOfAcceptedProjects(),
  });
  const { data: rejected } = useQuery({
    queryKey: ["rejectedProject", "projects"],
    queryFn: async () => await GetaNumberOfRejectedProjects(),
  });
  const { data: pedding } = useQuery({
    queryKey: ["pendingProjects", "projects"],
    queryFn: async () => await GetaNumberOfPendingProjects(),
  });
  return (
    <div className="relative flex flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={isFetching}>
        <StatsCard
          value={number as number}
          desc={"project Description"}
          title={"Project"}
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isFetching}>
        <StatsCard
          value={accepted as number}
          desc={"accepted Description"}
          title={"accepted project"}
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isFetching}>
        <StatsCard
          value={rejected as number}
          desc={"rejected project Description"}
          title={"Rejected project "}
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isFetching}>
        <StatsCard
          value={pedding as number}
          desc={"pedding project Description"}
          title={"Pedding project "}
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
};

function StatsCard({
  value,
  desc,
  title,
  icon,
}: {
  value: number;
  desc: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total {title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col">
          <CountUp
            preserveValue
            redraw={false}
            end={value}
            decimals={0}
            decimal=","
            className="text-2xl"
          />
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
