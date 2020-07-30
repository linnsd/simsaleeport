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

  getTopupByID = async (branch_id, user_id, topuptype_id, operator_id) => {
    // alert(operator_id);
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      form: "2020-01-2",
      to: "2020-08-2",
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
