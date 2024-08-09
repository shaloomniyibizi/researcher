import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExtendedUser } from "@/lib/types/next-auth";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: Pick<ExtendedUser, "image" | "name">;
}
export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={user.image!} alt={user?.name!} />
      <AvatarFallback>
        {user.name !== null || user.name !== undefined ? (
          user
            .name!.split(" ")
            .map((chunk) => chunk[0])
            .join("")
        ) : (
          <User />
        )}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
