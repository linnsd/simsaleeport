import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
const axios = require("axios");
import { getLoginapi } from "@api/Url";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      user_id: "",
      pass: "",
      isOnline: false,
    };
  }
  componentDidMount = async () => {
    NetInfo.addEventListener((state) => {
      this.setState({ isOnline: state.isConnected });
    });
  };
  handleLogin = async () => {
    var self = this;
    if (this.state.isOnline) {
      let appuser = {
        email: self.state.user_id,
        password: self.state.pass,
      };
      // console.log(appuser);
      axios
        .post(getLoginapi, appuser, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          console.log(response.data);
          self.setState({
            access_token: response.data.access_token,
            user_id: response.data.email,
            pass: response.data.password,
          });
          self.props.navigation.navigate("Home");
        })
        .catch(function (err) {
          alert("Email or Password id Incorrect");
        });
    }
  };
  render() {
    // alert("Access_token","this.state.access_token");
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <Image
            source={require("@images/linn.png")}
            style={{ width: 100, height: 100 }}
          />
          <View style={styles.loginForm}>
            <TextInput
              value={this.state.user_id}
              style={styles.textInput}
              placeholder="User Name or Email"
              placeholderTextColor="black"
              onChangeText={(value) => this.setState({ user_id: value })}
            />
            <TextInput
              secureTextEntry={true}
              value={this.state.pass}
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="black"
              onChangeText={(value) => this.setState({ pass: value })}
            />
            <TouchableOpacity
              style={styles.touchBtn}
              onPress={() => this.handleLogin()}
            >
              <Text style={styles.text}>Sing In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FE7F0A",
  },
  secondContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loginForm: {
    backgroundColor: "#ffffff",
    padding: 20,
    paddingBottom: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor:"#FE7F0A"
  },
  textInput: {
    margin: 10,
    width: 200,
    height: 40,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    borderColor: "#FE7F0A",
    elevation: 2,
    backgroundColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
  },
  touchBtn: {
    borderWidth: 1,
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FE7F0A",
    backgroundColor: "#FE7F0A",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
  },
  text: {
    color: "#ffffff",
  },
});
