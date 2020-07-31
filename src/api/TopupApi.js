var axios = require("axios");
import React from "react";
import { AsyncStorage } from "react-native";
export default class PostApi extends React.Component {
  getAllTopup = async (page) => {
    var access_token = await AsyncStorage.getItem("access_token");
    return axios.get(
      "http://128.199.79.79/simsale-dev/public/api/topup?page=" + page,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
  };
}
