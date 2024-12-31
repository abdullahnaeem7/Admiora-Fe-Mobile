import ConnectyCube from "react-native-connectycube";
import appConfig from "@/connectycube_config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/models/user";
import { setCurrentUser, updateCurrentUser } from "@/actions/currentUser";
import chatService from "./chat-service";
import { getImageLinkFromUID, preparationUploadImg } from "@/helpers/file";
import { setAppIsLoading } from "@/actions/app";
import store from "@/store";
import { LogOut } from "@/reducers";

class AuthService {
  static CURRENT_USER_SESSION_KEY = "CURRENT_USER_SESSION_KEY";
  static DEVICE_SUBSCRIPTION_ID = "DEVICE_SUBSCRIPTION_ID";

  async init() {
    try {
      console.log("working");

      store.dispatch(setAppIsLoading(true));

      ConnectyCube.init(...appConfig.connectyCubeConfig);
      this.tryAutoLogin();
    } catch (error) {
      console.error("chat >>>>>>>>>", error);
    }
  }

  async updateCurrentUser({ image, full_name, login }) {
    const updateData = {};
    if (full_name) {
      updateData.full_name = full_name;
    }
    if (login) {
      updateData.login = login;
    }
    if (image) {
      const file = preparationUploadImg(image);
      const resultUploadImg = await ConnectyCube.storage.createAndUpload({
        file,
      });
      updateData.avatar = resultUploadImg.uid;
    }
    const responseUpdateUser = await ConnectyCube.users.update(updateData);
    const prewSession = await this.getUserSession();
    responseUpdateUser.user.avatar = getImageLinkFromUID(
      responseUpdateUser.user.avatar
    );
    const newSession = Object.assign(
      JSON.parse(prewSession),
      responseUpdateUser.user
    );
    await this.setUserSession(newSession);
    store.dispatch(updateCurrentUser(responseUpdateUser.user));
  }

  async tryAutoLogin() {
    const checkUserSessionFromStore = await this.getUserSession();
    if (checkUserSessionFromStore) {
      const data = JSON.parse(checkUserSessionFromStore);
      await this.signIn({ login: data.login, password: data.password });
    }

    store.dispatch(setAppIsLoading(false));
  }

  async signIn(params) {
    try {
      console.warn("params", params);

      const session = await ConnectyCube.createSession(params);

      console.log("session", session);

      const currentUser = new User(session.user);

      console.log("currentUser", currentUser);

      session.user.avatar = getImageLinkFromUID(session.user.avatar);
      store.dispatch(setCurrentUser(session));
      const customSession = Object.assign({}, currentUser, {
        password: params.password,
      });
      this.setUserSession(customSession);

      chatService.connect(customSession.id, customSession.password);
      return currentUser;
    } catch (error) {
      console.error("login error: " + error);
    }
  }

  async signUp(params) {
    await ConnectyCube.createSession();
    await ConnectyCube.users.signup(params);
    return this.signIn(params);
  }

  async setUserSession(userSession) {
    return AsyncStorage.setItem(
      AuthService.CURRENT_USER_SESSION_KEY,
      JSON.stringify(userSession)
    );
  }

  async getUserSession() {
    return await AsyncStorage.getItem(AuthService.CURRENT_USER_SESSION_KEY);
  }

  async unsubscribePushNotifications() {
    const subscriptionIdToDelete = await this.getStoreDeviceSubscriptionId();
    ConnectyCube.pushnotifications.subscriptions.delete(subscriptionIdToDelete);
  }

  async getStoreDeviceSubscriptionId() {
    return await AsyncStorage.getItem(AuthService.DEVICE_SUBSCRIPTION_ID);
  }

  async logout() {
    try {
      await this.unsubscribePushNotifications();
    } catch (error) {}

    await AsyncStorage.clear();
    await ConnectyCube.logout();
    store.dispatch(LogOut());
  }

  get currentUser() {
    return store.getState().currentUser;
  }
}

const authService = new AuthService();

Object.freeze(authService);

export default authService;
