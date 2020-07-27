import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
const axios = require("axios");

import { getBranchApi, getTopupApi, createTopupApi } from "@api/Url";
//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import ErrorText from "@components/ErrorText";

const Operator = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
export default class CreateTopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: { value: null, label: null },
      branches: [],
      topup: { value: null, label: null },
      topuptypes: [],
      operator: { value: null, label: null },
      qty: "",

      ISBRANCHERROR: false,
      ISOPERATORERROR: false,
      ISTOPUPTYPEERROR: false,
      ISQTYERROR: false,
    };
  }

  componentDidMount = async () => {
    await this._getAllBranch();
    await this._getAllTopupType();
  };

  //get all branch
  _getAllBranch = async () => {
    var self = this;
    axios
      .get(getBranchApi, {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYwMTdmZmI0YThkMmRkNGI4MzI5NmI2ODdhNjMyM2ZkZDI2NGNmOTZlM2I3MTQwMDc5ZDZjMTczOTAxOWUxZjJjNTI1YWRjNjZhNmYyNzk4In0.eyJhdWQiOiIxIiwianRpIjoiZjAxN2ZmYjRhOGQyZGQ0YjgzMjk2YjY4N2E2MzIzZmRkMjY0Y2Y5NmUzYjcxNDAwNzlkNmMxNzM5MDE5ZTFmMmM1MjVhZGM2NmE2ZjI3OTgiLCJpYXQiOjE1OTU0NzkwNTUsIm5iZiI6MTU5NTQ3OTA1NSwiZXhwIjoxNjI3MDE1MDU1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.n35bsKhBe5bEvFspMnXFvrBXc1Sq6zjhu4fVOw7j_tJtzN8Myy9Tu6mtF5wt6iOXbFz_oMaf1bYapfcLxaPiNXtJznfw7N2wFaKsAfujs3fPiA4Ipvp8ZsBMH_7mXUJYcz0ad6gQFkFJBuZHRB9-HO94aZdnkdg9aeBvvHNGAS_eX0BhSdwnyTIFvNl5O7v1ndF85lJcOfmGn1ej_WwijWIEfbKa_gcJsDQw7EWFSwEU6IzSwQQZFPFp055soX9M6PbNKvcjZLkG6DaEGZXTrdf3lvGFqbiiYKTqjbktWbOYnfN7vCsL2-3swN6r7DV_JWs-rNXmSC1BMOqAVZTfc2nS8042YBDS_4JG7xQMeqEuQ761-Oyqpr-F6CdyapLB8Wqi1wqyBP1fqbQPAYgtiUbXqQeISO2Tcik2-sHxzFx-hacwdBd7EowMc553UKBags9XBapJ3G_0sqakUTprxvazDLd0HL4MDiapgsULvhrQwDvETdwjrIYRaV66AJFZSLlNhyMHdytxoAR6KcH_RXb3fCFy7MYS1KoUQ4O83NiXX-OW7PivvZ19nlGEPc5ksGxbCsRRc031oM6Oh50pOesBUk_RtrLDZWafzyUZ7mCBHCI7akYYS1WFvuYHvpUqCPWiBKs3RNAddSlKD4z29JKGLmUZ-9rp6huFFrMFSSQ",
        },
      })
      .then(function (response) {
        let data = response.data.branch;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          // alert("Hi");
          var obj = {
            value: data.id ? data.id : "",
            label: data.branch_name ? data.branch_name : "",
          };
          // console.log(obj);
          arr.push(obj);
        });
        // console.log(arr);
        self.setState({ branches: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  //get all topup type
  _getAllTopupType = async () => {
    var self = this;
    axios
      .get(getTopupApi, {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYwMTdmZmI0YThkMmRkNGI4MzI5NmI2ODdhNjMyM2ZkZDI2NGNmOTZlM2I3MTQwMDc5ZDZjMTczOTAxOWUxZjJjNTI1YWRjNjZhNmYyNzk4In0.eyJhdWQiOiIxIiwianRpIjoiZjAxN2ZmYjRhOGQyZGQ0YjgzMjk2YjY4N2E2MzIzZmRkMjY0Y2Y5NmUzYjcxNDAwNzlkNmMxNzM5MDE5ZTFmMmM1MjVhZGM2NmE2ZjI3OTgiLCJpYXQiOjE1OTU0NzkwNTUsIm5iZiI6MTU5NTQ3OTA1NSwiZXhwIjoxNjI3MDE1MDU1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.n35bsKhBe5bEvFspMnXFvrBXc1Sq6zjhu4fVOw7j_tJtzN8Myy9Tu6mtF5wt6iOXbFz_oMaf1bYapfcLxaPiNXtJznfw7N2wFaKsAfujs3fPiA4Ipvp8ZsBMH_7mXUJYcz0ad6gQFkFJBuZHRB9-HO94aZdnkdg9aeBvvHNGAS_eX0BhSdwnyTIFvNl5O7v1ndF85lJcOfmGn1ej_WwijWIEfbKa_gcJsDQw7EWFSwEU6IzSwQQZFPFp055soX9M6PbNKvcjZLkG6DaEGZXTrdf3lvGFqbiiYKTqjbktWbOYnfN7vCsL2-3swN6r7DV_JWs-rNXmSC1BMOqAVZTfc2nS8042YBDS_4JG7xQMeqEuQ761-Oyqpr-F6CdyapLB8Wqi1wqyBP1fqbQPAYgtiUbXqQeISO2Tcik2-sHxzFx-hacwdBd7EowMc553UKBags9XBapJ3G_0sqakUTprxvazDLd0HL4MDiapgsULvhrQwDvETdwjrIYRaV66AJFZSLlNhyMHdytxoAR6KcH_RXb3fCFy7MYS1KoUQ4O83NiXX-OW7PivvZ19nlGEPc5ksGxbCsRRc031oM6Oh50pOesBUk_RtrLDZWafzyUZ7mCBHCI7akYYS1WFvuYHvpUqCPWiBKs3RNAddSlKD4z29JKGLmUZ-9rp6huFFrMFSSQ",
        },
      })
      .then(function (response) {
        let data = response.data.topupsetup;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          // alert("Hi");
          var obj = {
            value: data.id ? data.id : "",
            label: data.topup_type ? data.topup_type : "",
          };
          // console.log(obj);
          arr.push(obj);
        });
        // console.log(arr);
        self.setState({ topuptypes: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  _handleOnSave = async () => {
    let isError = false;
    if (this.state.branch.value == null) {
      // alert("Helo");
      this.setState({ ISBRANCHERROR: true });
      isError = true;
    }
    if (this.state.operator.value == null) {
      this.setState({ ISOPERATORERROR: true });
      isError = true;
    }
    if (this.state.topup.value == null) {
      this.setState({ ISTOPUPTYPEERROR: true });
      isError = true;
    }
    if (this.state.qty == "") {
      this.setState({ ISQTYERROR: true });
      isError = true;
    }
    if (!isError) {
      var self = this;

      let param = {
        user_id: 1,
        branch_id: this.state.branch.value,
        operator_id: this.state.operator.value,
        type_id: this.state.topup.value,
        qty: this.state.qty,
      };

      // console.log(param);

      axios
        .post(createTopupApi, param, {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYwMTdmZmI0YThkMmRkNGI4MzI5NmI2ODdhNjMyM2ZkZDI2NGNmOTZlM2I3MTQwMDc5ZDZjMTczOTAxOWUxZjJjNTI1YWRjNjZhNmYyNzk4In0.eyJhdWQiOiIxIiwianRpIjoiZjAxN2ZmYjRhOGQyZGQ0YjgzMjk2YjY4N2E2MzIzZmRkMjY0Y2Y5NmUzYjcxNDAwNzlkNmMxNzM5MDE5ZTFmMmM1MjVhZGM2NmE2ZjI3OTgiLCJpYXQiOjE1OTU0NzkwNTUsIm5iZiI6MTU5NTQ3OTA1NSwiZXhwIjoxNjI3MDE1MDU1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.n35bsKhBe5bEvFspMnXFvrBXc1Sq6zjhu4fVOw7j_tJtzN8Myy9Tu6mtF5wt6iOXbFz_oMaf1bYapfcLxaPiNXtJznfw7N2wFaKsAfujs3fPiA4Ipvp8ZsBMH_7mXUJYcz0ad6gQFkFJBuZHRB9-HO94aZdnkdg9aeBvvHNGAS_eX0BhSdwnyTIFvNl5O7v1ndF85lJcOfmGn1ej_WwijWIEfbKa_gcJsDQw7EWFSwEU6IzSwQQZFPFp055soX9M6PbNKvcjZLkG6DaEGZXTrdf3lvGFqbiiYKTqjbktWbOYnfN7vCsL2-3swN6r7DV_JWs-rNXmSC1BMOqAVZTfc2nS8042YBDS_4JG7xQMeqEuQ761-Oyqpr-F6CdyapLB8Wqi1wqyBP1fqbQPAYgtiUbXqQeISO2Tcik2-sHxzFx-hacwdBd7EowMc553UKBags9XBapJ3G_0sqakUTprxvazDLd0HL4MDiapgsULvhrQwDvETdwjrIYRaV66AJFZSLlNhyMHdytxoAR6KcH_RXb3fCFy7MYS1KoUQ4O83NiXX-OW7PivvZ19nlGEPc5ksGxbCsRRc031oM6Oh50pOesBUk_RtrLDZWafzyUZ7mCBHCI7akYYS1WFvuYHvpUqCPWiBKs3RNAddSlKD4z29JKGLmUZ-9rp6huFFrMFSSQ",
          },
        })
        .then(function (response) {
          // console.log(response.data);
          alert(response.data.message);
        })
        .catch(function (err) {
          alert("Fail");
        });
    }
  };
  _handleOnSelectBranch(value, label) {
    this.setState({
      branch: { value: value, label: label },
      ISBRANCHERROR: false,
    });
  }

  _handleOnSelectTopupType(value, label) {
    this.setState({
      topup: { value: value, label: label },
      ISTOPUPTYPEERROR: false,
    });
  }
  _handleOnSelectOperator(value, label) {
    this.setState({
      operator: { value: value, label: label },
      ISOPERATORERROR: false,
    });
  }
  render() {
    // console.log(this.state.branches);
    return (
      <View style={styles.container}>
        <Header name="Topup" />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Branch*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown
                  value={this.state.branch}
                  widthContainer="100%"
                  options={this.state.branches}
                  onSelect={(value, label) =>
                    this._handleOnSelectBranch(value, label)
                  }
                  placeholder="Select Branch..."
                ></DropDown>
                <ErrorText
                  errMessage="Please select branch"
                  isShow={this.state.ISBRANCHERROR}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Operator</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown
                  value={this.state.operator}
                  options={Operator}
                  widthContainer="100%"
                  onSelect={(value, label) =>
                    this._handleOnSelectOperator(value, label)
                  }
                  placeholder="Select Operator..."
                ></DropDown>
                <ErrorText
                  errMessage="Please select operator"
                  isShow={this.state.ISOPERATORERROR}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Topup Type*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown
                  value={this.state.topup}
                  options={this.state.topuptypes}
                  widthContainer="100%"
                  onSelect={(value, label) =>
                    this._handleOnSelectTopupType(value, label)
                  }
                  placeholder="Select Topup type..."
                ></DropDown>
                <ErrorText
                  errMessage="Please select topup type"
                  isShow={this.state.ISTOPUPTYPEERROR}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Qty*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  value={this.state.qty}
                  onChangeText={(value) =>
                    this.setState({ qty: value, ISQTYERROR: false })
                  }
                ></TextInput>
                <ErrorText
                  errMessage="Please enter qty"
                  isShow={this.state.ISQTYERROR}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => this.props.navigation.navigate("Topup")}
                >
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => this._handleOnSave()}
                >
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  formContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textContainer: {
    width: "30%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  labelStyle: { fontSize: 19 },
  textInputStyle: {
    borderColor: "#707070",
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
  },
  backBtn: {
    backgroundColor: "#5799FC",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#1FD449",
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
});
