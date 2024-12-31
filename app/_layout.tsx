import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AppStateContext } from "@/context/AppStateContext";
import { ReactQueryProvider } from "@/utils/react-query-provider";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import React from "react";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
import chatService from "@/services/chat-service";
import authService from "@/services/auth-service";
import { Provider } from "react-redux";
import store from "@/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const initSDK = async () => {
    try {
      await authService.init();
    } catch (error) {
      console.error("chat error", error);
    }
  };
  useEffect(() => {
    initSDK();
  }, []);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization Status:", authStatus);
  //   } else {
  //     console.log("Permission not granted:", authStatus);
  //   }
  // };

  // useEffect(() => {
  //   requestUserPermission();

  //   messaging()
  //     .getToken()
  //     .then((token) => console.log("FCM Token:", token))
  //     .catch(console.error);

  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //       }
  //     });

  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //   });

  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log("Message handled in the background:", remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     const { notification } = remoteMessage;

  //     // Check if notification and its properties are present
  //     if (notification && notification.title && notification.body) {
  //       Alert.alert(
  //         "A new Message arrived",
  //         `${notification.title}\n ${notification.body}`
  //       );
  //     } else {
  //       console.log(
  //         "Notification payload missing title or body",
  //         remoteMessage
  //       );
  //     }

  //     const token = await messaging().getToken();
  //     console.log("FCM Token in Background:", token);
  //   });

  //   return () => unsubscribe && unsubscribe();
  // }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ReactQueryProvider>
          <AppStateContext>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Slot />
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </AppStateContext>
        </ReactQueryProvider>
        <Toast />
      </ThemeProvider>
    </Provider>
  );
}
