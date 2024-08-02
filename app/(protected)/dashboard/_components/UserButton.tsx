import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { HelpCircle, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import UserAvatar from "./UserAvatar";
const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <UserAvatar
            user={{
              name: user?.name || null,
              image: user?.image || null,
            }}
            className="h-6 w-6"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <Link href={"/dashboard/settings"}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton>
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </div>
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
