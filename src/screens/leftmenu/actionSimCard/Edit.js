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
import DatePicker from "react-native-datepicker";
import Moment from "moment";
import SuccessModal from "@components/SuccessModal";

//import service
import { getToken } from "@services/GetToken";

//import axios
const axios = require("axios");
import {
  getBranchApi,
  getAllNrcCodeApi,
  getAllNrcStateApi,
  updateSimcardApi,
} from "@api/Url";

//import styles
import Style from "@styles/Styles";
const OPERATOR = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
const NRC_STATUS = [
  { value: "N", label: "N" },
  { value: "P", label: "P" },
];
export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      nrc_no: "",
      address: "",
      contact_phone: "",
      simcard_no: "",
      serial_no: "",
      imei1: "",
      imei2: "",
      topupAmt: "",
      model: "",
      branchs: [],
      branch: { value: null, label: null },
      operator: { value: null, label: null },
      nrccodes: [],
      nrccode: { value: null, label: null },
      nrcstates: [],
      nrcstate: { value: null, label: null },
      nrcstatus: { value: null, label: null },
      role_id:"",
      isOpenSuccessModel: false,
    };
  }
  componentWillMount() {
    let data = this.props.navigation.getParam("data");

    if (data.operator_id == "1") {
      this.setState({
        operator: {
          value: data.operator_id,
          label: "MPT",
        },
      });
    }
    if (data.operator_id == "2") {
      this.setState({
        operator: {
          value: data.operator_id,
          label: "Telenor",
        },
      });
    }
    if (data.operator_id == "3") {
      this.setState({
        operator: {
          value: data.operator_id,
          label: "Ooredoo",
        },
      });
    }
    if (this.props.navigation.getParam("data").operator_id == "4") {
      this.setState({
        operator: {
          value: data.operator_id,
          label: "Mytel",
        },
      });
    }
    // alert("Props Data is ",this.props.navigation.getParam("data").id);
    this.setState({
      id: data.id,
      name: data.name,
      nrc_no: data.nrc_number,
      address: data.address,
      contact_phone: data.phone,
      simcard_no: data.card_no,
      serial_no: data.serial,
      imei1: data.imei,
      imei2: data.imei2,
      topupAmt: data.topup,
      model: data.model,
      access_token: null,
      branch: {
        value: data.branch_id,
        label: data.branch_name ? data.branch_name : null,
      },
      // operator: {
      //   value: data.operator_id,
      //   label: data.operator_name ? data.operator_name : null,
      // },
      nrccode: { value: data.code_id, label: data.nrc_en ? data.nrc_en : null },
      nrcstate: {
        value: data.state_id,
        label: data.state_en ? data.state_en : null,
      },
      nrcstatus: { value: data.nrc_status, label: data.nrc_status },
    });
  }

  async componentDidMount() {
    const access_token = await getToken();
    const roleid = await AsyncStorage.getItem("role_id");
    this.setState({ access_token: access_token,role_id : roleid });
    await this.getAllBranch();
    await this.getAllNrcCode();
    // await this.getAllNrcState();
  }

  getAllBranch = async () => {
    const self = this;
    axios
      .get(getBranchApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        let data = response.data.branch;
        // console.log("Branch arr",response.data.branch[0]);
        let arr = [];
        data.map((data, index) => {
          // console.log("Data Branch",data.id);

          var obj = { value: data.id, label: data.branch_name };

          arr.push(obj);
        });
        self.setState({ branchs: arr });
      })
      .catch(function (error) {
        console.log("Branch Api Error", error);
      });
  };

  getAllNrcCode = async () => {
    const self = this;
    axios
      .get(getAllNrcCodeApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        // console.log("Get NRC",response.data.nrccode);
        let data = response.data.nrccode;
        let arr = [];
        data.map((data, index) => {
          // console.log("Data Branch",data.id);

          var obj = { value: data.id, label: data.nrc_en };

          arr.push(obj);
        });
        self.setState({ nrccodes: arr });
      })
      .catch(function (err) {
        console.log("NRC Code Error", err);
      });
  };
  getAllNrcState = async (nrc_code) => {
    const self = this;
    let bodyParam = {
      nrc_code: nrc_code,
    };
    axios
      .post(getAllNrcStateApi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.nrcstate[0]);
        let data = response.data.nrcstate;
        let arr = [];
        data.map((data, index) => {
          // console.log("Data Branch",data.id);

          var obj = { value: data.id, label: data.state_en };

          arr.push(obj);
        });
        self.setState({ nrcstates: arr });
      })
      .catch(function (err) {
        console.log("NRC State Error", err);
      });
  };

  _handleUpdate() {
    const self = this;
    // console.log(self.props.navigation.getParam("data"));
    const url = updateSimcardApi + self.props.navigation.getParam("data").id;
    // console.log(url);
    // console.log(self.props.navigation.getParam("data").id);
    let bodyParam = {
      branch_id: self.state.branch.value,
      operator_id: self.state.operator.value,
      code_id: self.state.nrccode.value,
      state_id: self.state.nrcstate.value,
      name: self.state.name,
      // nrc_number: self.state.nrc,
      nrc: self.state.nrc_no,
      nrc_status: self.state.nrcstatus.value,
      address: self.state.address,
      phone: self.state.contact_phone,
      imei: self.state.imei1,
      imei2: self.state.imei2,
      model: self.state.model,
      topup: self.state.topupAmt,
      card: self.state.simcard_no,
      serial: self.state.serial_no,
      sim_no: self.state.simcard_no,
      created_at: new Date(),
      updated_at: new Date(),
    };
    // console.log(bodyParam);
    axios
      .post(url, bodyParam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({
          isOpenSuccessModel: true,
        })
        // alert("Update Simcard Successfully");
      })
      .catch(function (err) {
        console.log("Update Error", err);
      });
  }

  _handleOnSelectBranch(value, label) {
    if(this.state.role_id == "1"){
      this.setState(
        {
          branch: {
            value: value,
            label: label,
          },
        }
        // () => this.getAllCustomerByID()
      );
    }
   
  }

  _handleOnSelectOperator(value, label) {
    if(this.state.role_id == "1"){
      this.setState(
        {
          operator: {
            value: value,
            label: label,
          },
        }
        // () => this.getAllCustomerByID()
      );
    }
   
  }
  _handleSelectNrcCode(value, label) {
    this.setState({
      nrccode: {
        value: value,
        label: label,
      },
    });
    // this.getAllNrcState(value);
  }
  _handleSelectState(value, label) {
    this.setState({
      nrcstate: {
        value: value,
        label: label,
      },
    });
  }
  _handleSelectStatus(value, label) {
    this.setState({
      nrcstatus: {
        value: value,
        label: label,
      },
    });
  }

  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
  }
  render() {
    // console.log("Edit Sim Card",this.props.navigation.getParam("data"));
    return (
      <View style={styles.container}>
        <Header
          name="Sim Card"
          Onpress={() => this.props.navigation.navigate("SIMCard")}
          // widthheader={15}
          // heightheader={15}
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
                  options={this.state.branchs}
                  widthContainer="100%"
                  onSelect={(value, label) =>
                    this._handleOnSelectBranch(value, label)
                  }
                ></DropDown>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Operator</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown
                  value={this.state.operator}
                  options={OPERATOR}
                  widthContainer="100%"
                  onSelect={(value, label) =>
                    this._handleOnSelectOperator(value, label)
                  }
                ></DropDown>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Name</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={this.state.name}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ name: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>NRC</Text>
              </View>
              <View
                style={[
                  styles.textInputContainer,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  },
                ]}
              >
                <DropDown
                  value={this.state.nrccode}
                  options={this.state.nrccodes}
                  widthContainer={55}
                  onSelect={(value, label) =>
                    this._handleSelectNrcCode(value, label)
                  }
                ></DropDown>
                <DropDown
                  value={this.state.nrcstate}
                  options={this.state.nrcstates}
                  widthContainer={100}
                  onSelect={(value, label) =>
                    this._handleSelectState(value, label)
                  }
                ></DropDown>
                <DropDown
                  value={this.state.nrcstatus}
                  options={NRC_STATUS}
                  onSelect={(value, label) =>
                    this._handleSelectStatus(value, label)
                  }
                ></DropDown>
                {/* <TextInput style={styles.nrcTextInput}></TextInput> */}
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>NRC Number</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.nrc_no}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ nrc_no: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Address</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  multiline={true}
                  value={this.state.address}
                  style={styles.textAreaStyle}
                  onChangeText={(value) => this.setState({ address: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Contact Phone</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.contact_phone}
                  style={styles.textInputStyle}
                  onChangeText={(value) =>
                    this.setState({ contact_phone: value })
                  }
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Sim Card No</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.simcard_no}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ simcard_no: value })}
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Serial No</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.serial_no}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ serial_no: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>IMEI1</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.imei1}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ imei1: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>IMEI2</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.imei2}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ imei2: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Topup Amt</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.topupAmt}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ topupAmt: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Model</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  value={this.state.model}
                  style={styles.textInputStyle}
                  onChangeText={(value) => this.setState({ model: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => this.props.navigation.navigate("SIMCard")}
                >
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._handleUpdate()}
                  style={styles.saveBtn}
                >
                  <Text style={styles.btnText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully SimCard updated"
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
    backgroundColor: "#ffffff",
  },
  textAreaStyle: {
    borderColor: "#ffffff",
    borderWidth: 1,
    minHeight: 80,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
    textAlignVertical:"top"
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
    backgroundColor: "#73A8DE",
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
  nrcTextInput: {
    borderColor: "#707070",
    borderWidth: 1,
    height: 35,
    width: "20%",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
  },
});
