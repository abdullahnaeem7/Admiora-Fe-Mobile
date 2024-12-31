import { router } from "expo-router";

export const logoutAndNavigate = async () => {
  await localStorage.clear();
  router.replace("/auth/login");
};
