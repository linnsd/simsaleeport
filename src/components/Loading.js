import React from "react";
import { StyleSheet, Image, View } from "react-native";

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("@images/loading1.gif")}
          style={styles.loadingImage}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingImage: {
    width: 70,
    height: 70
  }
});
