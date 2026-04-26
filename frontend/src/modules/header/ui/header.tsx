"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/shared/config/routes";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { ThemeToggle } from "@/modules/theme-toggle/ui/theme-toggle";

const ROOT_PATH = "/";

export const Header = () => {
  const pathname = usePathname();
  const pathArray = pathname?.split("/").filter(Boolean) ?? [];

  const findRouteName = (pathIndex: number) => {
    const routeUrl =
      pathArray.length > 0 ? `/${pathArray.slice(0, pathIndex + 1).join("/")}` : ROOT_PATH;
    const route = Object.values(ROUTES).find((routeItem) => routeItem.url === routeUrl);

    return route?.title ?? pathArray[pathIndex] ?? ROUTES.ROOT.title;
  };

  return (
    <header className="border-border flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>{findRouteName(0)}</BreadcrumbLink>
              </BreadcrumbItem>
              {pathArray.slice(1).map((path, index) => {
                const pathIndex = index + 1;
                const isLast = index === pathArray.length - 2;
                const BreadcrumbWrapper = isLast ? BreadcrumbPage : BreadcrumbLink;
                const props = !isLast && {
                  href: `/${pathArray.slice(0, pathIndex + 1).join("/")}`,
                };

                return (
                  <React.Fragment key={path}>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbWrapper {...props}>{findRouteName(pathIndex)}</BreadcrumbWrapper>
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
