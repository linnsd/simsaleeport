const axios = require("axios");
import React from "react";
import { AsyncStorage } from "react-native";
export default class BranchApi {
  getAllBranch = async () => {
    var access_token = await AsyncStorage.getItem("access_token");
    return axios.get("http://128.199.79.79/simsale-dev/public/api/branch", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + access_token,
      },
    });
  };

  // getTownshipsMemers() {
  //   return axios.get(BaseUrl + "townships/members/");
  // }

  // getTownshipShops() {
  //   return axios.get(BaseUrl + "townships/discount-shop/");
  // }
}
