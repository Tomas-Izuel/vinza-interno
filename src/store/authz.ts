import { Permissions } from "@/api/auth/auth.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthzState {
  permissions: Record<Permissions, Permissions>;
  isLoading: boolean;
}

interface AuthzActions {
  setPermissions: (permissions: Record<Permissions, Permissions>) => void;
  setLoading: (loading: boolean) => void;
  clearAuthz: () => void;
}

export type AuthzStore = AuthzState & AuthzActions;

export const useAuthzStore = create<AuthzStore>()(
  persist(
    (set: (partial: Partial<AuthzStore>) => void) => ({
      // State
      permissions: {} as Record<Permissions, Permissions>,

      isLoading: false,

      // Actions
      setPermissions: (permissions: Record<Permissions, Permissions>) =>
        set({ permissions }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      clearAuthz: () =>
        set({
          permissions: {} as Record<Permissions, Permissions>,
          isLoading: false,
        }),
    }),
    {
      name: "authz-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthzStore) => ({
        permissions: state.permissions,
      }),
    },
  ),
);
