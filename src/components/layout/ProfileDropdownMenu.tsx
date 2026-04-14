"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { BadgeCheckIcon, LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import createClient from "@/lib/supabase/client";

type ProfileDropdownMenuProps = {
  avatarUrl: string | null;
  email: string | null;
  role: string | null;
};

export default function ProfileDropdownMenu({
  avatarUrl,
  email,
  role,
}: ProfileDropdownMenuProps) {
  const router = useRouter();
  const fallback = useMemo(() => {
    return (email ?? "U").slice(0, 1).toUpperCase();
  }, [email]);

  const dashboardLink = role === "admin" ? "/admin" : "customer";

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={avatarUrl ?? undefined} alt="Profile" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={dashboardLink} className="flex items-center gap-2">
              <BadgeCheckIcon className="size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 text-red-500 focus:text-red-500"
          onClick={handleLogout}
        >
          <LogOutIcon className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
