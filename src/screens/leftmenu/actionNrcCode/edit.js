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
import { getAllNrcCodeApi } from "@api/Url";

//import component
import Header from "@components/Header";
import SuccessModal from "@components/SuccessModal";

export default class EditNRC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSuccessModel: false,
      nrccode_mm: "",
      nrccode_en: "",
    };
  }

  componentDidMount = async () => {
      const data = this.props.navigation.getParam("data");
      console.log("data",data.nrc_mm.toString);
    this.setState({
        nrccode_mm: data.nrc_mm.toString(),
        nrccode_en: data.nrc_en.toString(),
    });
  };

  _handleOnUpdate = async () => {
    const self = this;
    const url =
      getAllNrcCodeApi + "/" + self.props.navigation.getParam("data").id;
    let bodyParam = {
      code_mm: this.state.nrccode_mm.toString(),
      code_en: this.state.nrccode_en,
      remark: this.state.description,
    };
    const access_token = await AsyncStorage.getItem("access_token");
    axios
      .post(url, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        self.setState({
          isOpenSuccessModel: true,
          nrccode_en:"",
          nrccode_mm:""
        });
        //   alert ("Update Successfully")
      })
      .catch(function (err) {
        console.log("NRC Code Edit Err", err);
      });
  };

  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
  }

  render() {
    console.log(this.props.navigation.getParam("data"));
    return (
      <View style={styles.container}>
        <Header
          name="NRC Code"
          Onpress={() => this.props.navigation.navigate("NRCCode")}
        />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>NRC_Code MM</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  value={this.state.nrccode_mm}
                  onChangeText={(value) => this.setState({ nrccode_mm: value })}
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>NRC_Code EN</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  value={this.state.nrccode_en}
                  onChangeText={(value) => this.setState({ nrccode_en: value })}
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => this.props.navigation.navigate("NRCCode")}
                >
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => this._handleOnUpdate()}
                >
                  <Text style={styles.btnText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="NRC Code Update successfully"
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
    backgroundColor: "#ffffff",
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
});
