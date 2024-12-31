import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import appContext from "@/context/appContext";
import { useLogin } from "@/hooks/useAuth";
import LoadingModal from "@/components/Loading";
import { handleApiError } from "@/utils/errorHandler";
import { showError, showSuccess } from "@/utils/toastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "@/services/auth-service";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const { setUser, setIsLogged } = useContext(appContext);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { mutate: login, isError, error } = useLogin();
  const handleLogin = async () => {
    setLoading(true);
    try {
      login(
        { email, password },
        {
          onSuccess: (resp: any) => {
            const { restUser, token } = resp;
            setUser(restUser);
            try {
              AsyncStorage.setItem("@user_token", token).catch(() => {
                showError("Failed to save token");
              });

              const userLogin = { login: email, password: "Password@1" };
              authService
                .signIn(userLogin)
                .then((userCredentials: any) => {})
                .catch((error) => {
                  console.log(error);
                  alert("No such user");
                });
            } catch (error) {
              showError("Failed to save token");
            }
            showSuccess("loged in sucess");
            router.replace("/(tabs)/home");
            setLoading(false);
          },
          onError: (error) => {
            console.error("Login failed:", error);
            const errorMessage = handleApiError(error);
            showError(errorMessage);
            setLoading(false);
          },
        }
      );
    } catch (error) {
      console.error("auth hook error :", error);
      const errorMessage = handleApiError(error);
      showError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={{ flex: 1 }}>
        {isLoading && <LoadingModal visible={isLoading} text="Loading" />}

        {/* Top decorative circles */}
        <View style={styles.topCircles}>
          <View style={styles.circle1}></View>
          <View style={styles.circle3}></View>
          <View style={styles.circle2}></View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.heading}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Email or phone number"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <Text style={styles.heading}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="#B0B0B0"
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.eyeButton}
            >
              <Text style={styles.eyeText}>
                {secureTextEntry ? (
                  <AntDesign name="eye" size={24} color="grey" />
                ) : (
                  <Entypo name="eye-with-line" size={24} color="black" />
                )}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.replace("/auth/resetpassword");
            }}
          >
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "8%",
  },
  topCircles: {
    position: "absolute",
    width: "100%",
    height: height * 0.25,
  },
  circle1: {
    position: "absolute",
    top: -30,
    left: -40,
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#87CDF6",
    borderRadius: 100,
  },
  circle2: {
    position: "absolute",
    top: -100,
    right: -110,
    width: width * 0.45,
    height: width * 0.45,
    backgroundColor: "#87CDF6",
    borderRadius: 100,
  },
  circle3: {
    position: "absolute",
    top: -90,
    right: width * 0.6,
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: "#E8F5FD",
    borderRadius: 100,
  },
  title: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: height * 0.05,
  },
  input: {
    width: "100%",
    height: height * 0.06,
    borderWidth: 1,
    borderColor: "#CDE2F1",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  eyeText: {
    fontSize: width * 0.04,
    color: "#B0B0B0",
  },
  forgotPassword: {
    fontSize: width * 0.035,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
  },
  loginButton: {
    width: "80%",
    height: height * 0.08,
    backgroundColor: "#87CDF6",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  loginText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#000000",
  },
  heading: {
    fontSize: width * 0.04,
    textAlign: "left",
    fontWeight: "bold",
    color: "grey",
    marginBottom: 5,
    marginTop: 10,
  },
});
