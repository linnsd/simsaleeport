const axios = require("axios");
import React from "react";
import {BaseUrl} from "@api/Url";
import { AsyncStorage } from "react-native";
export default class PostApi extends React.Component {
  getAllSimcard = async (page) => {
    // alert(page);
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      page: page,
      form: new Date(),
      to: new Date(),
    };
    return axios.post(
   BaseUrl  + "cards?page=",
      bodyParam,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
  };

  getSimCardById = async (branch_id,operator_id) => {
    // alert(branch_id);
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      form: new Date(),
      to: new Date(),
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
     BaseUrl+ "cards?page=",
      bodyParam,
      {
        headers,
      }
    );
  };
}
