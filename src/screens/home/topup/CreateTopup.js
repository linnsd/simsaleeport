import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
const axios = require("axios");

import { getBranchApi, getTopupApi, createTopupApi } from "@api/Url";
//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import ErrorText from "@components/ErrorText";
import SuccessModal from "@components/SuccessModal";
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
      isOpenSuccessModel: false,
      role_id:""
    };
  }

  componentDidMount = async () => {
    const branchid = await AsyncStorage.getItem("branch_id");
    const roleid = await AsyncStorage.getItem("role_id");
    const operatorid = await AsyncStorage.getItem("operator_id");
    this.setState({role_id:roleid});

    if (operatorid == "1") {
      this.setState({
        operator: {
          value: operatorid,
          label: "MPT",
        },
      });
    }
    if (operatorid == "2") {
      this.setState({
        operator: {
          value: operatorid,
          label: "Telenor",
        },
      });
    }
    if (operatorid == "3") {
      this.setState({
        operator: {
          value: operatorid,
          label: "Ooredoo",
        },
      });
    }
    if (operatorid == "4") {
      this.setState({
        operator: {
          value: operatorid,
          label: "Mytel",
        },
      });
    }

    if (branchid == "1") {
      this.setState({
        branch: {
          value: branchid,
          label: "HO",
        },
      });
    }
    if (branchid == "2") {
      this.setState({
        branch: {
          value: branchid,
          label: "Linn 1",
        },
      });
    }
    if (branchid == "3") {
      this.setState({
        branch: {
          value: branchid,
          label: "Linn 2",
        },
      });
    }
    if (branchid == "4") {
      this.setState({
        branch: {
          value: branchid,
          label: "Linn 3",
        },
      });
    }


    await this._getAllBranch();
    await this._getAllTopupType();
  };
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
  }
  //get all branch
  _getAllBranch = async () => {
    var access_token = await AsyncStorage.getItem("access_token");
    // console.log("Branch Access Token is", access_token);
    var self = this;
    axios
      .get(getBranchApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
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
    var access_token = await AsyncStorage.getItem("access_token");
    // console.log(access_token);
    axios
      .get(getTopupApi, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
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
    var access_token = await AsyncStorage.getItem("access_token");
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
            Authorization: "Bearer " + access_token,
          },
        })
        .then(function (response) {
          // console.log(response.data);
          self.setState({
            isOpenSuccessModel: true,
            branch: { value: null, label: null },
            operator: { value: null, label: null },
            topup: { value: null, label: null },
            qty: "",
          });
        })
        .catch(function (err) {
          alert("Fail");
        });
    }
  };
  _handleOnSelectBranch(value, label) {
    if(this.state.role_id == "1"){
      this.setState({
        branch: { value: value, label: label },
        ISBRANCHERROR: false,
      });
    }
  
  }

  _handleOnSelectTopupType(value, label) {
    this.setState({
      topup: { value: value, label: label },
      ISTOPUPTYPEERROR: false,
    });
  }
  _handleOnSelectOperator(value, label) {
    if(this.state.role_id == "1"){
      this.setState({
        operator: { value: value, label: label },
        ISOPERATORERROR: false,
      });
    }
   
  }
  render() {
    // console.log(this.state.branches);
    return (
      <View style={styles.container}>
        <Header
          name="Topup"
          Onpress={() => this.props.navigation.navigate("Topup")}
        />
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
                keyboardType="number-pad"
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
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully topup created"
          onClose={() => this._handleOnClose()}
        />
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
    // alignItems: "flex-end",
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  labelStyle: { fontSize: 15 },
  textInputStyle: {
    borderColor: "#ffffff",
    backgroundColor:"#ffffff",
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
    backgroundColor: "orange",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#0470DD",
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 15,
  },
});
