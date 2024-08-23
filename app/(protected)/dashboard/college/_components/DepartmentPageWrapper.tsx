"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../users/_actions/user.actions";
import DepartmentTable from "./DepartmentTable";

function DepartmentPageWrapper() {
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
            <CardTitle className="text-3xl font-bold">Department</CardTitle>
            <CardDescription>
              Manage your departments and view their sales performance.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <DepartmentTable collegeId={dbUser?.collegeId!} />
      </CardContent>
    </Card>
  );
}

export default DepartmentPageWrapper;
