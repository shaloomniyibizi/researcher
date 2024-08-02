import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExtendedUser } from "@/lib/types/next-auth";
import { AvatarProps } from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<ExtendedUser, "image" | "name">;
}
export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={user?.image!} alt={user?.name!} />
      <AvatarFallback>
        {user
          ? user
              .name!.split(" ")
              .map((chunk) => chunk[0])
              .join("")
          : ""}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
