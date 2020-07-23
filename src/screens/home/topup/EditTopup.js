import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";

const Branch = [
  { value: 1, label: "HO" },
  { value: 2, label: "Linn1" },
];
export default class CreateTopup extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header name="Topup" />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Branch*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown value={Branch} widthContainer="100%"></DropDown>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Operator</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown value={Branch} widthContainer="100%"></DropDown>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Topup Type*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown value={Branch} widthContainer="100%"></DropDown>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Qty*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => this.props.navigation.navigate("Topup")}
                >
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  labelStyle: { fontSize: 19 },
  textInputStyle: {
    borderColor: "#707070",
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
    backgroundColor: "#5799FC",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#1FD449",
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
});
