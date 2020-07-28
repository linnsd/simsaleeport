import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default class Header extends React.Component {
  _OnPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._OnPress()}>
          <Image
            source={
              this.props.img
                ? this.props.img
                : require("@images/back_arrow.png")
            }
            style={styles.img}
          />
        </TouchableOpacity>

        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#FE7F0A",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  img: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});
