
import Toast from "react-native-toast-message";

export const showError = (message: string): void => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 60,
    bottomOffset: 40,
    props: {
      onHide: () => Toast.hide(), // Function to call when closing
    },
  });
};



export const showSuccess = (message: string): void => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 60,
    bottomOffset: 40,
    props: {
      onHide: () => Toast.hide(), // Function to call when closing
    },
  });
};
