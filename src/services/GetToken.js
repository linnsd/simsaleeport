import { AsyncStorage } from "react-native";

export const getToken = async () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("access_token")
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => reject(err));
  });
};