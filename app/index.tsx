import React, { useContext, useEffect } from "react";
import LoginScreen from "./auth/login";
import "react-native-gesture-handler";
import appContext from "@/context/appContext";
import useConnection from "@/hooks/useConnection";
import { router } from "expo-router";
import LoadingModal from "@/components/Loading";
import { ImageBackground } from "react-native";
import { useCustomerProfile } from "@/hooks/useCustomer";

export default function App() {
  const { data: profileData, isLoading, isError, error } = useCustomerProfile();
  const { setUser, user } = useContext(appContext);

  useEffect(() => {
    if (profileData) {
      setUser(profileData.customer);
    }
  }, [profileData]);

  if (isLoading) {
    return <LoadingModal visible={isLoading} text="Loading" />;
  }

  return <>{profileData ? router.replace("/(tabs)/home") : <LoginScreen />}</>;
}
