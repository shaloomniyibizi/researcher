"use client";

import SkeletonWrapper from "@/components/shared/SkeletonWrapper";
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
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, startOfYear } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import { getUserById } from "../_actions/user.actions";
import UserTable from "./UserTable";

function UserPageWrapper() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfYear(new Date()),
    to: new Date(),
  });
  const user = useCurrentUser();
  const { data: dbUser, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUserById(user?.id!),
  });
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <SkeletonWrapper isLoading={isFetching}>
              <CardTitle className="text-3xl font-bold">User</CardTitle>
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={isFetching}>
              <CardDescription>
                Manage your users and view their sales performance.
              </CardDescription>
            </SkeletonWrapper>
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
        <UserTable
          from={dateRange.from}
          to={dateRange.to}
          collegeId={dbUser?.collegeId!}
        />
      </CardContent>
    </Card>
  );
}

export default UserPageWrapper;
