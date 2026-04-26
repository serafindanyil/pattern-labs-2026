"use client";

import * as React from "react";
import { BookOpen, GraduationCap } from "lucide-react";

import { NavSection } from "@/shared/ui/nav-section";
import { HeaderSidebar } from "@/shared/ui/header-sidebar";
import { ROUTES } from "@/shared/config";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/shared/ui/sidebar";

const navigation = [
    {
        ...ROUTES.SPECIALIZATIONS,
        icon: GraduationCap,
    },
    {
        ...ROUTES.COURSES,
        icon: BookOpen,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <HeaderSidebar name="Coursera" description="Admin panel" logo="/icon.png" />
            </SidebarHeader>
            <SidebarContent>
                <NavSection name={ROUTES.CONTENT.title} items={navigation} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
