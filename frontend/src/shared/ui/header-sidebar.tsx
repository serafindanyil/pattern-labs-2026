"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { DropdownMenu, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";

export function HeaderSidebar({
  name,
  logo,
  description,
}: {
  name: string;
  logo: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" onClick={() => router.push("/")}>
              <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src={logo}
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className="size-8 object-cover"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{description}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
