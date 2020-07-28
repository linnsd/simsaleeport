const axios = require("axios");
import React from "react";
export default class PostApi {
  getAllTopup(page) {
    // alert(page);
    let bodyParam = {
      page: page,
      from: "2020-05-1",
      to: "2020-09-20",
    };
    return axios.post(
      "http://128.199.79.79/simsale/public/api/topup",
      bodyParam,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE0NTI2NGI0Y2YzODg3NzIzOTAwNTgyY2RjZWIxYzgzNWNhYTlhNmM0OTQ3ZTk0YjRjNGQ4NWQ5MDEyM2IxNTRmYTViNTQ2NDQwNTU5OGM5In0.eyJhdWQiOiIxIiwianRpIjoiMTQ1MjY0YjRjZjM4ODc3MjM5MDA1ODJjZGNlYjFjODM1Y2FhOWE2YzQ5NDdlOTRiNGM0ZDg1ZDkwMTIzYjE1NGZhNWI1NDY0NDA1NTk4YzkiLCJpYXQiOjE1OTU5MzU1NzEsIm5iZiI6MTU5NTkzNTU3MSwiZXhwIjoxNjI3NDcxNTcxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.CFUQ8FFPLDgUgnLl3ttUdCSr5TOaViESrRuqDVV06QZ8jhlkxkID3EHgcK5DtrLdkflfsI0MdEjy_EfzzXI8nMt28w_STnVmOKAuJfmVMnbvzFQOSYIaD7z9tOdD7JG2BscwrnQyd8NFWdCS87XTUo0RChHoPZb3wbINTfAVgX8J3qpw7S58fA1OOx9AybQxDa16Z5vLPRCYx1yx2RI0bC74isOpP4p6MSzAnXApiR-P75w4anPkUlcy6v7yeKnsl6iutMMshJofxIs3-sN9kwmVfS69ZmwuPEn8ycDYCTV1PJJPIo1T4-iaoBA8_9vxQrpw1xe7ZfulQQ8Np2-7Z2QMR3QdnKS36f17xQZbwxtqffNgomIgHgP_pEaEunDN4l8NbXbNgcphom5hQdDB9RME5oyIqycWYxCpXKOKO5PUSCd2xfZ-74NqVevfCkvpQOTTGEc-wsFSFrVdps9hArUf0GPb7MHSuWsVfmLM6TVojrBYU1MY_RCB6Cz8ETR1HjRlVkD45pQUNQhgZleI7SvHNso16jsVRPXGT03c7EvwwZAAda1FfNoL_vbq2eZ2sXT7iB75mttHynUgdy4SwuyZNzpdNHQCx1C-sKUpV4hRIvi3q2_0gRf9OTkP7mZCj8m1qzuzYMVfKDPH2yrwAY7YG7yiMTRcoMu2ZwyZBqU",
        },
      }
    );
  }

  getTopupByID(branch_id, user_id, topuptype_id) {
    return axios.get(
      "http://128.199.79.79/simsale/public/api/" +
        `topup/search?branch_id=${branch_id}&user_id=${user_id}&topuptype_id=${topuptype_id}`
    );
  }
}
