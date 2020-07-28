var axios = require("axios");

export default class PostApi {
  getAllCustomer(page) {
    return axios.get(
      "http://128.199.79.79/simsale/public/api/customers?page=" + page,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYwMTdmZmI0YThkMmRkNGI4MzI5NmI2ODdhNjMyM2ZkZDI2NGNmOTZlM2I3MTQwMDc5ZDZjMTczOTAxOWUxZjJjNTI1YWRjNjZhNmYyNzk4In0.eyJhdWQiOiIxIiwianRpIjoiZjAxN2ZmYjRhOGQyZGQ0YjgzMjk2YjY4N2E2MzIzZmRkMjY0Y2Y5NmUzYjcxNDAwNzlkNmMxNzM5MDE5ZTFmMmM1MjVhZGM2NmE2ZjI3OTgiLCJpYXQiOjE1OTU0NzkwNTUsIm5iZiI6MTU5NTQ3OTA1NSwiZXhwIjoxNjI3MDE1MDU1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.n35bsKhBe5bEvFspMnXFvrBXc1Sq6zjhu4fVOw7j_tJtzN8Myy9Tu6mtF5wt6iOXbFz_oMaf1bYapfcLxaPiNXtJznfw7N2wFaKsAfujs3fPiA4Ipvp8ZsBMH_7mXUJYcz0ad6gQFkFJBuZHRB9-HO94aZdnkdg9aeBvvHNGAS_eX0BhSdwnyTIFvNl5O7v1ndF85lJcOfmGn1ej_WwijWIEfbKa_gcJsDQw7EWFSwEU6IzSwQQZFPFp055soX9M6PbNKvcjZLkG6DaEGZXTrdf3lvGFqbiiYKTqjbktWbOYnfN7vCsL2-3swN6r7DV_JWs-rNXmSC1BMOqAVZTfc2nS8042YBDS_4JG7xQMeqEuQ761-Oyqpr-F6CdyapLB8Wqi1wqyBP1fqbQPAYgtiUbXqQeISO2Tcik2-sHxzFx-hacwdBd7EowMc553UKBags9XBapJ3G_0sqakUTprxvazDLd0HL4MDiapgsULvhrQwDvETdwjrIYRaV66AJFZSLlNhyMHdytxoAR6KcH_RXb3fCFy7MYS1KoUQ4O83NiXX-OW7PivvZ19nlGEPc5ksGxbCsRRc031oM6Oh50pOesBUk_RtrLDZWafzyUZ7mCBHCI7akYYS1WFvuYHvpUqCPWiBKs3RNAddSlKD4z29JKGLmUZ-9rp6huFFrMFSSQ",
        },
      } 
    );
  }

  
}
