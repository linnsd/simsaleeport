import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("@images/back_arrow.png")} style={styles.img} />
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#FE7F0A",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    color: "#ffffff",
  },
  img: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
