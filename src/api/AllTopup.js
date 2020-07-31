const axios = require("axios");
import React from "react";
import { AsyncStorage } from "react-native";
export default class PostApi extends React.Component {
  getAllTopup = async (page) => {
    // alert(page);
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      page: page,
      form: new Date(),
      to: new Date(),
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

  getTopupByID = async (branch_id, user_id, topuptype_id, operator_id) => {
    // alert(branch_id);
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      form: new Date(),
      to: new Date(),
      type_id: topuptype_id ? topuptype_id : null,
      user_id: user_id ? user_id : null,
      branch_id: branch_id ? branch_id : null,
      operator_id: operator_id ? operator_id : null,
    };
    // console.log(bodyParam);
    let headers = {
      Accept: "application/json",
      Authorization: "Bearer " + access_token,
    };
    // console.log(headers);
    return axios.post(
      "http://128.199.79.79/simsale-dev/public/api/topup",
      bodyParam,
      {
        headers,
      }
    );
  };
}
