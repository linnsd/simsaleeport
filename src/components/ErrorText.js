import React from "react";
import { Text, StyleSheet } from "react-native";

export default class ErrorText extends React.Component {
  render() {
    return this.props.isShow ? (
      <Text style={styles.errText}>{this.props.errMessage}</Text>
    ) : null;
  }
}

const styles = StyleSheet.create({
  errText: {
    color: "red",
    fontSize: 12,
    flex: 1,
    // width: "50%",
  },
});
