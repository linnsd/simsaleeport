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

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import ErrorText from "@components/ErrorText";
import SuccessModal from "@components/SuccessModal";
//import url
import { getBranchApi, getTopupApi, getAlltopupApi } from "@api/Url";
const axios = require("axios");
const OPERATORS = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
export default class CreateTopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      branch: { value: null, label: null },
      operator: { value: null, label: null },
      topups: [],
      topup: { value: null, label: null },
      qty: "",
      user_id: "",

      ISBRANCHERROR: false,
      ISOPERATORERROR: false,
      ISTOPUPTYPEERROR: false,
      ISQTYERROR: false,
      isOpenSuccessModel: false,
      role_id : ""
    };
  }
  componentDidMount = async () => {
    const roleid = await AsyncStorage.getItem("role_id");
    this.setState({
      role_id:roleid
    })
    await this._getAllBranch();
    await this._getAllTopupType();
    await this._getEditData();
  };
  _getEditData = async () => {
    var access_token = await AsyncStorage.getItem("access_token");
    // console.log("Branch Access Token is", access_token);
    var self = this;
    axios
      .get(getAlltopupApi + "/" + this.props.navigation.getParam("data").id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        // alert(response.data.data[0].type_id);
        self.setState({
          qty: self.props.navigation.getParam("data").qty,
          user_id: response.data.data[0].user_id,
          branch: {
            value: response.data.data[0].branch_id,
            label: self.props.navigation.getParam("data").branch_name,
          },
          topup: {
            value: response.data.data[0].type_id,
            label: self.props.navigation.getParam("data").topup_type,
          },
        });
        if (self.props.navigation.getParam("data").operator_id == "1") {
          self.setState({
            operator: {
              value: self.props.navigation.getParam("data").operator_id,
              label: "MPT",
            },
          });
        }
        if (self.props.navigation.getParam("data").operator_id == "2") {
          self.setState({
            operator: {
              value: self.props.navigation.getParam("data").operator_id,
              label: "Telenor",
            },
          });
        }
        if (self.props.navigation.getParam("data").operator_id == "3") {
          self.setState({
            operator: {
              value: self.props.navigation.getParam("data").operator_id,
              label: "Ooredoo",
            },
          });
        }
        if (self.props.navigation.getParam("data").operator_id == "4") {
          self.setState({
            operator: {
              value: self.props.navigation.getParam("data").operator_id,
              label: "Mytel",
            },
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
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
  _getAllTopupType = async () => {
    var self = this;
    var access_token = await AsyncStorage.getItem("access_token");
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
        self.setState({ topups: arr });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  _handleOnselectBranch(value, label) {
    if(this.state.role_id == "1"){
      this.setState({ branch: { value: value, label: label } });
    }
   
  }
  _handleOnselectOperator(value, label) {
    if(this.state.role_id == "1"){
      this.setState({ operator: { value: value, label: label } });
    }
   
  }
  _handleOnselectTopup(value, label) {
    this.setState({ topup: { value: value, label: label } });
  }
  _handleUpdate = async () => {
    let isError = false;
    if (this.state.branch.value == null) {
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
    if (!this.state.qty) {
      this.setState({ ISQTYERROR: true });
      isError = true;
    }
    if (!isError) {
      var self = this;
      var access_token = await AsyncStorage.getItem("access_token");
      let bodyParam = {
        branch_id: self.state.branch.value,
        user_id: self.state.user_id,
        operator_id: self.state.operator.value,
        type_id: self.state.topup.value,
        qty: self.state.qty,
      };
      let url =
        getAlltopupApi + "/" + self.props.navigation.getParam("data").id;
      // console.log(bodyParam);
      axios
        .post(url, bodyParam, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .then(function (response) {
          self.setState({ isOpenSuccessModel: true });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
    this.props.navigation.navigate("Topup");
  }
  render() {
    // console.log(this.props.navigation.getParam("data"));
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
                  placeholder="Select Branch"
                  value={this.state.branch}
                  widthContainer="100%"
                  options={this.state.branches}
                  onSelect={(value, label) =>
                    this._handleOnselectBranch(value, label)
                  }
                ></DropDown>
                <ErrorText
                  isShow={this.state.ISBRANCHERROR}
                  errMessage="Please select branch"
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Operator</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown
                  placeholder="Select Operator"
                  value={this.state.operator}
                  widthContainer="100%"
                  options={OPERATORS}
                  onSelect={(value, label) =>
                    this._handleOnselectOperator(value, label)
                  }
                ></DropDown>
                <ErrorText
                  isShow={this.state.ISOPERATORERROR}
                  errMessage="Please select operator"
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Topup Type*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown
                  placeholder="Select Topup type"
                  value={this.state.topup}
                  widthContainer="100%"
                  options={this.state.topups}
                  onSelect={(value, label) =>
                    this._handleOnselectTopup(value, label)
                  }
                ></DropDown>
                <ErrorText
                  isShow={this.state.ISTOPUPTYPEERROR}
                  errMessage="Please select topup type"
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
                  value={this.state.qty.toString()}
                  onChangeText={(value) => this.setState({ qty: value })}
                  keyboardType="number-pad"
                ></TextInput>
                <ErrorText
                  isShow={this.state.ISQTYERROR}
                  errMessage="Please enter qty"
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
                  onPress={() => this._handleUpdate()}
                >
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Updated successfully"
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
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor:"#ffffff"
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
    backgroundColor: "#5A7FEC",
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
