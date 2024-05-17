import { useAuthStore } from "store/authStore";
import { permissions } from "routes/permissions";

export const usePermissions = (type?: "all" | "self") => {
  const role: string = useAuthStore((s: any) => s.role);
  return type ?
    {
      permissions: type === "all" ? permissions : permissions[role],
      checkPermission: (permission: string) => permissions[role] ? permissions[role].includes(permission) : false
    }
    : { checkPermission: (permission: string) => permissions[role] ? permissions[role].includes(permission) : false };
};