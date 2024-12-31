import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import authService from "@/services/auth-service";
import { disconnectSocket, getSocket } from "@/helpers/socket";

export const logoutAndNavigate = async () => {
  const socket = getSocket();
  const router = useRouter();
  const dispatch = useDispatch();

  await authService.logout();
  if (socket) {
    disconnectSocket();
  }
  router.push("/Auth/LoginScreen");
};
