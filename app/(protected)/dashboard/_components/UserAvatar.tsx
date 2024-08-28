import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { ExtendedUser } from "@/lib/types/next-auth";
import { AvatarProps } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../users/_actions/user.actions";

interface UserAvatarProps extends AvatarProps {
  users?: Pick<ExtendedUser, "image" | "name">;
}
export function UserAvatar({ users, ...props }: UserAvatarProps) {
  const currentUser = useCurrentUser();
  const { data: user } = useQuery({
    queryKey: ["userSession"],
    queryFn: async () => await getUserById(currentUser?.id!),
  });

  return (
    <Avatar {...props}>
      <AvatarImage src={user?.image!} alt={user?.name!} />
      <AvatarFallback>
        {user
          ?.name!.split(" ")
          .map((chunk) => chunk[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
