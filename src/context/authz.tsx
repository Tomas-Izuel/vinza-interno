"use client";

import { getMyPermissions } from "@/api/auth/auth.service";
import { Permissions } from "@/api/auth/auth.type";
import { AuthzStore, useAuthzStore } from "@/store/authz";
import { useEffect } from "react";

export function HydrateAuthz({
  initialPermissions,
}: {
  initialPermissions: Record<Permissions, Permissions> | null;
}) {
  const setPermissions = useAuthzStore((s: AuthzStore) => s.setPermissions);
  const setLoading = useAuthzStore((s: AuthzStore) => s.setLoading);
  useEffect(() => {
    console.log(
      "Hydrating active client with initial permissions:",
      initialPermissions,
    );
    setLoading(true);
    if (initialPermissions) {
      setPermissions(initialPermissions);
      setLoading(false);
    } else {
      getMyPermissions().then((permissions) => {
        setPermissions(permissions);
        setLoading(false);
      });
    }
  }, [initialPermissions, setPermissions, setLoading]);

  return null;
}
