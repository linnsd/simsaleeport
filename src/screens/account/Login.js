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

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <Image
            source={require("@images/linn.png")}
            style={{ width: 100, height: 100 }}
          />
          <View style={styles.loginForm}>
            <TextInput
              style={styles.textInput}
              placeholder="User Name or Email"
              placeholderTextColor="black"
            />
            <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor="black"/>
            <TouchableOpacity
              style={styles.touchBtn}
              onPress={()=>this.props.navigation.navigate("Home")}
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
    backgroundColor: "#FE7F0A",
  },
  secondContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loginForm: {
    backgroundColor: "#ffffff",
    padding: 20,
    paddingBottom:30,
    borderRadius: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  textInput: {
    margin: 10,
    width: 200,
    height: 40,
    borderWidth: 1,
    textAlign:"center",
    borderRadius:5,
    borderColor:"#FE7F0A",
    elevation:2,
    backgroundColor:"#ffffff",
    shadowOffset: { width: 0, height: 2 },//IOS
   shadowOpacity: 0.5,//IOS
  },
  touchBtn:{
    borderWidth: 1,
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    borderRadius:5,
    borderColor:"#FE7F0A",
    backgroundColor:"#FE7F0A",
    elevation:2,
    shadowOffset: { width: 0, height: 2 },//IOS
    shadowOpacity: 0.5,//IOS
  },
  text:{
      color:"#ffffff"
  }
});
