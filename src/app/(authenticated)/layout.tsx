import { getMyPermissions } from "@/api/auth/auth.service";
import { HydrateAuthz } from "@/context/authz";
import TopNav from "@/components/common/Navbar";
import SidebarNav from "@/components/common/Sidebar";
import type React from "react";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default async function LayoutWrapper({ children }: LayoutWrapperProps) {
  const permissions = await getMyPermissions();
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 common-main-container">{children}</main>
        <HydrateAuthz initialPermissions={permissions} />
      </div>
    </div>
  );
}
