"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Separator } from "@/components/ui/separator";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import db from "@/lib/db";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, startOfYear } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import ProjectTable from "./ProjectTable";

function ProjectPageWrapper() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfYear(new Date()),
    to: new Date(),
  });
  const user = useCurrentUser();
  const { data: dbUser, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await db.user.findFirst({ where: { id: user?.id } }),
  });
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <CardTitle className="text-3xl font-bold">Project</CardTitle>
            <CardDescription>
              Manage your projects and view their sales performance.
            </CardDescription>
          </div>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;

              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `The selected date range is too big, Max allowed range is ${MAX_DATE_RANGE_DAYS} days`,
                );
                return;
              }
              setDateRange({ from, to });
            }}
          />
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <ProjectTable
          from={dateRange.from}
          to={dateRange.to}
          collegeId={dbUser?.collegeId!}
        />
      </CardContent>
    </Card>
  );
}

export default ProjectPageWrapper;
