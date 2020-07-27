import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Card extends React.Component {
  render() {
    const { data } = this.props;
    // console.log(data[0].address);
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>{this.props.date}</Text>
        <View style={styles.secondContainer}>
          <View style={{ width: "30%" }}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Name</Text>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Phone No</Text>
            <Text style={[styles.text, { fontWeight: "bold" }]}>NRC</Text>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Address</Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text style={styles.text}>{this.props.name}</Text>
            <Text style={styles.text}>{this.props.phone}</Text>
            <Text style={styles.text}>{this.props.nrc}</Text>
            <Text style={styles.text}>{this.props.address}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
    padding: 10,
  },
  text: {
    paddingTop: 5,
  },
  secondContainer: {
    // flex:1,
    flexDirection: "row",
  },
  dateText: {
    fontWeight: "bold",
    textAlign: "right",
  },
});
