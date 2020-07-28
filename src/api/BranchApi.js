const axios = require("axios");

export default class BranchApi {
  getAllBranch() {
    return axios.get("http://128.199.79.79/simsale/public/api/branch", {
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUzYjY2Yzc3MjNkNWJjZjkwNTk0NTk1OGEzOTU5MjJmYWViNDQwNWEyZjk1MzQ2YWFkODk5Mjc3MGJiYWFmZDA5MmVjM2ZhMTk0NTczZTdlIn0.eyJhdWQiOiIxIiwianRpIjoiZTNiNjZjNzcyM2Q1YmNmOTA1OTQ1OTU4YTM5NTkyMmZhZWI0NDA1YTJmOTUzNDZhYWQ4OTkyNzcwYmJhYWZkMDkyZWMzZmExOTQ1NzNlN2UiLCJpYXQiOjE1OTU4NTAwNDcsIm5iZiI6MTU5NTg1MDA0NywiZXhwIjoxNjI3Mzg2MDQ3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ALhHc9igzS7GPjKwwTmdO_6X9YXMFHm5h2rLJ8k9gtj7Kq9NQF_bl-0rJxc8DorKPYvNkNjaeiDM6ZpxzzEcKMthWP7lvGlMIi-DrG-87garKoCqdkih31Mvyb6dZwBuySe9C2jzLtu65knft1Ss9bFae6KwGEDzSztQWHEsYQLj9PaSgo0xvs1g3GgE-kBG3_yx939SbHdm73H7r5zZz01_DWd-b16RKGubhTGWDMjnUwEaLHal9ureJifIPPHRmdU1TsyU5NnzfWfz5ZL1iZj0oiNAA9GJ6fGdiMlyaPC5mGTCqY6jUREJTWEjM9E68zboQ6ApNVSJ6_23m5pyzBOSGSvNlKg6eCs9zh2UnPN-VuDNxuo8TrWWrfWjFBbVnPVK3mLAC2r2nRrt_vLTiNOQ6O8NIlhGGzCrUJFVnSAMuPLtEBz1WyxBhf3P8_TQ_w4CiDyIAcyaDr8CcjvrlEaHIjmwDb27z88V5A7icYQ0kpnQ1VgYScDUP0TdMp9STHf6YusWO--WWJvKvJ4uJ6RxS2eg_avhgMWzRziRcj_7jbwhCeSmhcwqt925PKXVgQ45fvwQ6vC4D_mwmshENgkFApp9QKCSGZdum4FfZgMojvQe41GAtKbfEmFXNcc4Z_NfFrYj60pc6AYU_KLv8Op0FEdou2goM0dCu6vChCk",
      },
    });
  }

  // getTownshipsMemers() {
  //   return axios.get(BaseUrl + "townships/members/");
  // }

  // getTownshipShops() {
  //   return axios.get(BaseUrl + "townships/discount-shop/");
  // }
}
