import { AppSidebar } from "@/shared/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";

import { Header } from "@/modules/header";

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
