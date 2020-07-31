import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import DatePicker from "react-native-datepicker";
import SuccessModal from "@components/SuccessModal";
import Moment from "moment";

//import axios
const axios = require("axios");
import {
  creatSimcardApi,
  getBranchApi,
  getAllNrcCodeApi,
  getAllNrcStateApi,
} from "@api/Url";

//import service
import { getToken } from "@services/GetToken";

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
      access_token: null,
      branchs: [],
      branch: { value: null, label: null },
      operator: { value: null, label: null },
      nrccodes: [],
      nrccode: { value: null, label: null },
      nrcstates: [],
      nrcstate: { value: null, label: null },
      nrcstatus: { value: null, label: null },
      name: "",
      address: "",
      phone: "",
      simcardNo: "",
      imei1: "",
      imei2: "",
      topupAmt: "",
      model: "",
      nrc: "",
      createDate: null,
      serialNO: "",
      isOpenSuccessModel: false,
    };
  }

  async componentDidMount() {
    const access_token = await getToken();
    this.setState({ access_token: access_token });
    await this.getAllBranch();
    await this.getAllNrcCode();
    await this.getAllNrcState();
  }
  createSimcard = async () => {
    var self = this;
    let bodyParam = {
      branch_id: self.state.branch.value,
      operator_id: self.state.operator.value,
      code_id: self.state.nrccode.value,
      state_id: self.state.nrcstate.value,
      name: self.state.name,
      // nrc_number: self.state.nrc,
      nrc: self.state.nrc,
      nrc_status: self.state.nrcstatus.value,
      address: self.state.address,
      phone: self.state.phone,
      imei: self.state.imei1,
      imei2: self.state.imei2,
      model: self.state.model,
      topup: self.state.topupAmt,
      card: self.state.simcardNo,
      serial: self.state.serialNO,
      created_at: new Date(),
      updated_at: new Date(),
    };
    axios
      .post(creatSimcardApi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data.nrc);
        self.setState({
          branch: "",
          operator: "",
          nrccode: "",
          nrcstate: "",
          name: "",
          nrc: "",
          nrc_status: "",
          address: "",
          phone: "",
          imei1: "",
          imei2: "",
          model: "",
          topupAmt: "",
          simcardNo: "",
          serialNO: "",
          isOpenSuccessModel: true,
        });
        // alert("Create SimCard Successfully")
      })
      .catch(function (err) {
        console.log("Create SimCard Error", err);
      });
  };
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
  getAllNrcState = async () => {
    const self = this;
    axios
      .get(getAllNrcStateApi, {
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

  _handleOnSelectBranch(value, label) {
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

  _handleOnSelectOperator(value, label) {
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
  _handleSelectNrcCode(value, label) {
    this.setState({
      nrccode: {
        value: value,
        label: label,
      },
    });
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
    // console.log(this.state.nrcstate.value);
    // console.log("Create ticket",this.props.navigation.getParam("simcard").state_id);
    return (
      <View style={styles.container}>
        <Header
          name="Sim Card"
          Onpress={() => this.props.navigation.navigate("SIMCard")}
          widthheader={15}
          heightheader={15}
        />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            {/* <View style={styles.formContainer}> */}
            {/* <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Date*</Text>
              </View> */}
            {/* <View style={styles.textInputContainer}>
                <DatePicker
                  date={this.state.createDate}
                  mode="date"
                  format="DD-MM-YYYY"
                  maxDate={Moment().endOf("day").toDate()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconSource={require("@images/calendar.png")}
                  style={Style.datePickerContainerOne}
                  customStyles={{
                    dateIcon: Style.datePickerDateIcon,
                    dateInput: Style.datePickerDateInput,
                    dateText: Style.datePickerDateText,
                  }}
                  onDateChange={(date) =>
                    this.setState({ createDate: date })
                  }
                />
              </View> */}
            {/* </View> */}
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
                  style={styles.textInputStyle}
                  value={this.state.name}
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
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <View>
                  <DropDown
                    value={this.state.nrccode}
                    options={this.state.nrccodes}
                    widthContainer={55}
                    placeholder="1"
                    // widthContainer="100%"
                    onSelect={(value, label) =>
                      this._handleSelectNrcCode(value, label)
                    }
                  ></DropDown>
                </View>
                <View>
                  <DropDown
                    value={this.state.nrcstate}
                    options={this.state.nrcstates}
                    widthContainer={100}
                    onSelect={(value, label) =>
                      this._handleSelectState(value, label)
                    }
                  ></DropDown>
                </View>

                <DropDown
                  value={this.state.nrcstatus}
                  options={NRC_STATUS}
                  //  widthContainer="95%"
                  placeholder="N"
                  onSelect={(value, label) =>
                    this._handleSelectStatus(value, label)
                  }
                ></DropDown>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>NRC Number</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.textInputStyle}
                  value={this.state.nrc}
                  onChangeText={(value) => this.setState({ nrc: value })}
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Address</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  value={this.state.address}
                  onChangeText={(value) => {
                    this.setState({ address: value });
                  }}
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
                  style={styles.textInputStyle}
                  value={this.state.phone}
                  onChangeText={(value) => {
                    this.setState({ phone: value });
                  }}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Sim Card No</Text>
                {/* <Text></Text> */}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.textInputStyle}
                  value={this.state.simcardNo}
                  onChangeText={(value) => this.setState({ simcardNo: value })}
                ></TextInput>
                {/* <TextInput
                  style={[styles.textInputStyle, { marginTop: 10 }]}
                ></TextInput> */}
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Serial Number</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.textInputStyle}
                  value={this.state.serialNO}
                  onChangeText={(value) => this.setState({ serialNO: value })}
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
                  style={styles.textInputStyle}
                  value={this.state.imei1}
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
                  style={styles.textInputStyle}
                  value={this.state.imei2}
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
                  style={styles.textInputStyle}
                  value={this.state.topupAmt}
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
                  style={styles.textInputStyle}
                  value={this.state.model}
                  onChangeText={(value) => this.setState({ model: value })}
                ></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                {/* <TouchableOpacity style={styles.backBtn}>
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => this.createSimcard()}
                >
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="SimCard create Successfully"
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
  labelStyle: {
    fontSize: 15,
  },
  textInputStyle: {
    borderColor: "#ffffff",
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
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
  nrcTextInput: {
    borderColor: "#ffffff",
    borderWidth: 1,
    height: 40,
    width: "20%",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
  },
});
