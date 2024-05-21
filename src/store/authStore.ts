import { create } from "zustand";

export const useAuthStore = create((setState) => ({
  isAuth: false,
  role: "",
  setAuth: (data: { isAuth: boolean, role: string }) => {
    setState(() => ({ isAuth: data.isAuth, role: data.role }));
    return 1;
  }
}));