import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
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
  constructor(props) {
    super(props);
    this.state = {
      branch: { value: null, label: null },
      isShow: false,
    };
  }
  _handleOnPressEdit(arrIndex) {
    if (arrIndex == 1) {
      this.props.navigation.navigate("EditTopup");
    }
  }

  _handleOnSelectBranch(value, label) {
    // alert(value);
    this.setState({ branch: { value: value, label: label } });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}></StatusBar>
        <Header name="Topup" />
        <View style={{ marginTop: 10 }}>
          <View style={styles.searchContainer}>
            <View style={styles.searchTextInput}>
              <Image
                source={require("@images/searchbk.png")}
                style={styles.searchIcon}
              />
              <TextInput
                style={{ flex: 1, height: 40 }}
                placeholder="Search ..."
              ></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ isShow: !this.state.isShow })}
              // style={{ marginLeft: 10 }}
            >
              <Image
                source={require("@images/more1.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
          {this.state.isShow == true ? (
            <View>
              <View style={[styles.searchContainer, { marginTop: 10 }]}>
                <DropDown
                  value={this.state.branch}
                  widthContainer={182}
                  placeholder="Select Branch..."
                  options={BRANCH}
                  onSelect={(value, label) =>
                    this._handleOnSelectBranch(value, label)
                  }
                  style={{ flex: 1 }}
                  optionsContainerWidth="40%"
                />

                <DropDown
                  value={BRANCH}
                  widthContainer={180}
                  marginLeftContainer={5}
                  placeholder="Select Operator..."
                  style={{ flex: 1 }}
                />
              </View>
              <View style={[styles.searchContainer, { marginTop: "2%" }]}>
                <DropDown
                  value={BRANCH}
                  widthContainer={182}
                  placeholder="Select by user..."
                />

                <DropDown
                  value={BRANCH}
                  widthContainer={180}
                  marginLeftContainer={5}
                  placeholder="Select by topup..."
                />
              </View>
            </View>
          ) : (
            // alert("Hi")
            <View></View>
          )}
          {/* <View style={styles.searchContainer}>
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
          </View> */}

          {/* <View style={styles.addContainer}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => this.props.navigation.navigate("CreateTopup")}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                Add New Record
              </Text>
            </TouchableOpacity>
          </View> */}
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
            onPressEdit={this._handleOnPressEdit.bind(this)}
            arrIndex={1}
          />
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("CreateTopup")}
          style={styles.newBtn}
        >
          <Image source={require("@images/add.png")} style={styles.btnImg} />
        </TouchableOpacity>
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
    width: "100%",
    // backgroundColor: "green",
    alignItems: "center",
  },
  searchTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#707070",
    height: 40,
    // marginRight: 10,
    borderRadius: 5,
    // paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    width: 50,
    height: 50,
    // backgroundColor: "green",
    resizeMode: "contain",
    // marginRight: 5,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  addContainer: {
    marginTop: "5%",
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
  newBtn: {
    position: "absolute",
    right: 20,
    bottom: 40,
  },
  btnImg: {
    resizeMode: "contain",
    width: 60,
    height: 60,
  },
});
