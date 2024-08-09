import SkeletonWrapper from "@/components/shared/SkeletonWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const NotificationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <ScrollArea className="max-h-[calc(100vh-10rem)]">
        <CardContent>
          <SkeletonWrapper isLoading={true} fullWidth>
            <div className="grid h-full gap-4">
              <Link
                href={"#"}
                className="flex transform items-center gap-4 transition duration-500 hover:scale-95"
              >
                <Avatar>
                  <AvatarImage alt={"user"} />
                  <AvatarFallback>
                    {"Olivia Martin"
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add comment to your project
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date("2024-07-12T17:30:00"), {
                    addSuffix: true,
                  })}
                </div>
              </Link>
              <Link
                href={"#"}
                className="flex transform items-center gap-4 transition duration-500 hover:scale-95"
              >
                <Avatar>
                  <AvatarImage alt={"user"} />
                  <AvatarFallback>
                    {"Olivia Martin"
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add comment to your project
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date("2024-07-12T17:30:00"), {
                    addSuffix: true,
                  })}
                </div>
              </Link>
              <Link
                href={"#"}
                className="flex transform items-center gap-4 transition duration-500 hover:scale-95"
              >
                <Avatar>
                  <AvatarImage alt={"user"} />
                  <AvatarFallback>
                    {"Olivia Martin"
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add comment to your project
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date("2024-07-12T17:30:00"), {
                    addSuffix: true,
                  })}
                </div>
              </Link>
              <Link
                href={"#"}
                className="flex transform items-center gap-4 transition duration-500 hover:scale-95"
              >
                <Avatar>
                  <AvatarImage alt={"user"} />
                  <AvatarFallback>
                    {"Olivia Martin"
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add comment to your project
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date("2024-07-12T17:30:00"), {
                    addSuffix: true,
                  })}
                </div>
              </Link>
            </div>
          </SkeletonWrapper>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default NotificationCard;
