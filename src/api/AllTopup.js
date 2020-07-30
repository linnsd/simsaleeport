const axios = require("axios");
import React from "react";
import { AsyncStorage } from "react-native";
export default class PostApi extends React.Component {
  getAllTopup = async (page) => {
    // alert(page);
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      page: page,
      from: "2020-05-1",
      to: "2020-09-20",
    };
    return axios.post(
      "http://128.199.79.79/simsale-dev/public/api/topup",
      bodyParam,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
  };

  getTopupByID = async (branch_id, user_id, topuptype_id) => {
    var access_token = AsyncStorage.getItem("access_token");
    return axios.get(
      "http://128.199.79.79/simsale-dev/public/api/" +
        `topup/search?branch_id=${branch_id}&user_id=${user_id}&topuptype_id=${topuptype_id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
  };
}
