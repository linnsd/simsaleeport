import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
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
      userid:null,

    };
  }
  componentDidMount = async () => {
    NetInfo.addEventListener((state) => {
      this.setState({ isOnline: state.isConnected });
    });
    const user = await AsyncStorage.getItem('user_id');
    const routeName =user !=null ? "HDashboardNavigator" : "Login";
    this.props.navigation.navigate(routeName);
  };
  handleLogin = async () => {
    if (this.state.user_id == "" || this.state.pass == "") {
      ToastAndroid.show("Email or Password is required!", ToastAndroid.SHORT);
    } else {
      const self = this;
      if (self.state.isOnline) {
        let appuser = {
          email: self.state.user_id,
          password: self.state.pass,
        };
        axios
          .post(getLoginapi, appuser, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then(function (response) {
            // console.log("Authorization is ",  response.data.access_token);
            if (response.data.status == "1") {
              // alert(response.data.user.role_id);
              var roleid= response.data.user.role_id.toString();
              var branchid= response.data.user.branch_id.toString();
              var operatorid= response.data.user.operator_id.toString();
              var id =  response.data.user.id.toString();
              AsyncStorage.multiSet(
                [
                  ["access_token", response.data.access_token],
                  ["role_id",roleid ],
                  ["branch_id",branchid],
                  ["operator_id",operatorid],
                  ["name",response.data.user.name],
                  ["user_id",response.data.user.email],
                ],
                (err) => {
                  if (err) {
                    alert("Asynstorage Error");
                    // console.log(err);
                  } else {
                    self.props.navigation.navigate("HDashboardNavigator");
                  }
                }
              );
              self.setState({
                access_token: response.data.access_token,
                user_id: response.data.email,
                pass: response.data.password,
              });
              self.props.navigation.navigate("HDashboardNavigator");
            } else {
              // alert("Invalid Username or Password");
              ToastAndroid.show(
                "Invalid Username or Password",
                ToastAndroid.SHORT
              );
            }
          })
          .catch(function (err) {
            // console.log(err);
            // alert("Username or Password is require!");
            ToastAndroid.show(
              "Email or password is invalid",
              ToastAndroid.SHORT
            );
          });
      }
    }
  };
  clearState() {
    this.setState({
      user_id: null,
      pass: null,
    });
  }
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
    borderWidth: 1,
    borderColor: "#10AFEA",
  },
  textInput: {
    margin: 10,
    width: 200,
    height: 40,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    borderColor: "#10AFEA",
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
    borderColor: "#10AFEA",
    backgroundColor: "#10AFEA",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
  },
  text: {
    color: "#ffffff",
  },
});
