import { router, useRouter } from "expo-router";
import { useContext, useState } from "react";
import appContext from "@/context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogoutHandler = () => {
  const context = useContext(appContext);
  const { resetContextState } = context;

  // Loader state to manage the loading status
  const [isLoading, setIsLoading] = useState(false);

  const logoutAndNavigate = async () => {
    setIsLoading(true); // Show the loader
    try {
      AsyncStorage.clear();
      resetContextState();
      router.replace("/auth/login");
    } finally {
      setIsLoading(false); // Hide the loader when done
    }
  };

  return { logoutAndNavigate, isLoading };
};

export default useLogoutHandler;
