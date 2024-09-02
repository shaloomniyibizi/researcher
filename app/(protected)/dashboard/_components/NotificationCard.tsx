import SkeletonWrapper from "@/components/shared/SkeletonWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DBExtendedUser, ExtendedNotification } from "@/lib/types/db";
import { formatTimeToNow } from "@/lib/utils";
import { Project } from "@prisma/client";
import Link from "next/link";

interface Props {
  user: DBExtendedUser;
  notification: ExtendedNotification[];
  project: Project[];
}
const NotificationCard = ({ user, notification, project }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <ScrollArea className="max-h-[calc(100vh-10rem)]">
        <CardContent>
          <SkeletonWrapper isLoading={false} fullWidth>
            <div className="grid h-full gap-4">
              {notification.map((notify) =>
                user.role !== "STUDENT" && notify.type === "Message"
                  ? notify.user?.collegeId === user.collegeId && (
                      <Link
                        key={notify.id}
                        href={`/dashboard/notification/${notify.id}`}
                        className="flex transform gap-4 transition duration-500 hover:scale-95"
                      >
                        <Avatar>
                          <AvatarImage src={notify.user?.image!} alt={"user"} />
                          <AvatarFallback>
                            {notify.user
                              ?.name!.split(" ")
                              .map((chunk) => chunk[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">
                            {notify.user?.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notify.title}
                          </p>
                          <p className="line-clamp-1 text-sm text-muted-foreground">
                            {notify.message}
                          </p>
                        </div>
                        <div className="ml-auto shrink-0 text-xs text-muted-foreground">
                          {formatTimeToNow(notify.createdAt)}
                        </div>
                      </Link>
                    )
                  : project.map(
                      (pro) =>
                        notify.projectId === pro.id &&
                        user.id === pro.userId && (
                          <Link
                            href={`/dashboard/notification/${notify.id}`}
                            key={notify.id}
                            className="flex transform gap-4 transition duration-500 hover:scale-95"
                          >
                            <Avatar>
                              <AvatarImage
                                src={notify.user?.image!}
                                alt={"user"}
                              />
                              <AvatarFallback>
                                {notify.user
                                  ?.name!.split(" ")
                                  .map((chunk) => chunk[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">
                                {notify.user?.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notify.title}
                              </p>
                              <p className="line-clamp-1 text-sm text-muted-foreground">
                                {notify.message}
                              </p>
                            </div>
                            <div className="ml-auto shrink-0 text-xs text-muted-foreground">
                              {formatTimeToNow(notify.createdAt)}
                            </div>
                          </Link>
                        ),
                    ),
              )}
            </div>
          </SkeletonWrapper>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default NotificationCard;
