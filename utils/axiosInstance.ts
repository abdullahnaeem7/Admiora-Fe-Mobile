import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_API_URL } from "@/constants/ApiUrl";



export const privateApi = axios.create({
  baseURL: BASE_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: "",
  },
});

privateApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {

    if (error.response && error.response.status === 401) {
      try {
      } catch (storageError) {
        console.error("AsyncStorage error:", storageError);
      }
    }
    return Promise.reject(error);
  }
);

privateApi.interceptors.request.use(async (request) => {
  const accessToken = await AsyncStorage.getItem("@user_token");

  console.log("accessToken", accessToken);


  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

export const publicApi = axios.create({
  baseURL: BASE_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});