import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default class HeaderLeft extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("DrawerNavigator")}>
        <Image source={require("@images/threeline.png")} style={styles.img}/>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
    marginLeft:15
  },
});
