import { memo } from "react";
import { useAuthzStore } from "@/store/authz";
import { Permissions } from "@/api/auth/auth.type";

interface GuardProps {
  children: React.ReactNode;
  permissions: Permissions[];
}

export const AuthzGuard = memo(function Guard({
  children,
  permissions,
}: GuardProps) {
  const { permissions: userPermissions } = useAuthzStore();

  // Check if user has at least one of the required permissions
  const hasPermission = permissions.some(
    (permission) => userPermissions[permission] !== undefined,
  );

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
});
