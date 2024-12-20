"use client";
import { Icons } from "@/components/shared/Icons";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mainSideBarMenu, sideBarMenu } from "@/lib/constants";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AsideBar = () => {
  const path = usePathname();
  const user = useCurrentUser();
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 p-2">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded bg-primary font-semibold text-primary-foreground"
          >
            <Icons.logo className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">LOGO </span>
          </Link>
          <Separator />

          {mainSideBarMenu.map((item, index) => (
            <Tooltip key={index}>
              {user?.role === "FACULTY" && item.role.includes("faculity") && (
                <>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-foreground",
                        path === item.href
                          ? "text-primbg-primary-foreground bg-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {item.icon}
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="rounded">
                    {item.title}
                  </TooltipContent>
                </>
              )}
              {user?.role === "STUDENT" && item.role.includes("student") && (
                <>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-foreground",
                        path === item.href
                          ? "text-primbg-primary-foreground bg-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {item.icon}
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="rounded">
                    {item.title}
                  </TooltipContent>
                </>
              )}
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          {sideBarMenu.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-9 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground",
                    item.role === "student" &&
                      "h-9 bg-primary p-2 text-primary-foreground",
                  )}
                >
                  {item.icon}
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="rounded">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default AsideBar;
