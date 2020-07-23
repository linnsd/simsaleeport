import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import TopupCard from "@components/TopupCard";

const BRANCH = [
  { value: 1, label: "HO" },
  { value: 2, label: "Linn1" },
  { value: 3, label: "Linn2" },
];
export default class Topup extends React.Component {
  _handleOnPressEdit(arrIndex) {
    if (arrIndex == 1) {
      this.props.navigation.navigate("EditTopup");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header name="Topup" />
        <View style={{ marginTop: 10 }}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search..."
            ></TextInput>
            <TouchableOpacity style={styles.searchBtn}>
              <Image
                source={require("@images/search.png")}
                style={styles.searchIcon}
              ></Image>
              <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.searchContainer, { marginTop: 10 }]}>
            <DropDown value={BRANCH} widthContainer="98%" />

            <DropDown
              value={BRANCH}
              widthContainer="98%"
              marginLeftContainer={5}
            />
          </View>
          <View style={[styles.searchContainer, { marginTop: "11%" }]}>
            <DropDown value={BRANCH} widthContainer="98%" />

            <DropDown
              value={BRANCH}
              widthContainer="98%"
              marginLeftContainer={5}
            />
          </View>
          <View style={styles.addContainer}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => this.props.navigation.navigate("CreateTopup")}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                Add New Record
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <TopupCard
            date="1.1.2020"
            branchname="HO"
            name="MPT HO"
            operator="MPT"
            topuptype="1000"
            qty="100"
            onPressEdit={this._handleOnPressEdit.bind(this)}
            arrIndex={1}
          />
          <TopupCard
            date="1.1.2020"
            branchname="HO"
            name="MPT HO"
            operator="MPT"
            topuptype="1000"
            qty="100"
          />
          <TopupCard
            date="1.1.2020"
            branchname="HO"
            name="MPT HO"
            operator="MPT"
            topuptype="1000"
            qty="100"
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    // flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  searchTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#707070",
    height: 40,
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 20,
  },

  searchBtn: {
    flex: 1,
    backgroundColor: "#5799FC",
    borderColor: "#5799FC",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  addContainer: {
    marginTop: "13%",
    paddingHorizontal: 10,
    alignItems: "flex-end",
  },
  addBtn: {
    backgroundColor: "#1FD449",
    height: 42,
    width: "48%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
