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
  FlatList,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import TopupCard from "@components/TopupCard";
import Loading from "@components/Loading";
import SuccessModal from "@components/SuccessModal";

//import apis
import AllTopup from "@api/AllTopup";
import BranchApi from "@api/BranchApi";
import TopupTypeApi from "@api/TopupTypeApi";
import UserApi from "@api/UserApi";
import { getAlltopupApi } from "@api/Url";
const axios = require("axios");

const OPERATORS = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
export default class Topup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      branches: [],
      branch: { value: null, label: null },
      topuptypes: [],
      topuptype: { value: null, label: null },
      users: [],
      user: { value: null, label: null },
      operator: { value: null, label: null },
      searchTopup: [],
      keyword: "",
      isLoading: true,
      refreshing: false,
      isFooterLoading: false,
      isShow: false,
      isOpenSuccessModel: false,
    };
    this.page = 1;
    this.BranchApi = new BranchApi();
    this.AllTopup = new AllTopup();
    this.TopupTypeApi = new TopupTypeApi();
    this.UserApi = new UserApi();
  }
  _handleOnPressEdit(arrIndex, data) {
    // console.log(data);
    if (arrIndex == 1) {
      this.props.navigation.navigate("EditTopup", { data: data });
    }
  }
  _handleOnPressDelete = async (item) => {
    // alert(item.id);
    const self = this;
    var access_token = await AsyncStorage.getItem("access_token");
    // console.log(getAlltopupApi);
    axios
      .delete(getAlltopupApi + "/" + item.id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({ isOpenSuccessModel: true });
        // this._getAllTopup(this.page);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount = async () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ isShow: false });
    });

    await this._getAllBranch();
    await this._getAllUser();
    await this._getAllTopupType();
    await this._getAllTopup(this.page);
  };

  _getAllBranch() {
    const self = this;
    self.BranchApi.getAllBranch()
      .then(function (response) {
        let data = response.data.branch;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          var obj = { value: data.id, label: data.branch_name };
          arr.push(obj);
        });
        self.setState({ branches: arr });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getAllUser() {
    const self = this;
    self.UserApi.getAllUser()
      .then(function (response) {
        let data = response.data.user;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          var obj = { value: data.id, label: data.name };
          arr.push(obj);
        });
        self.setState({ users: arr });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getAllTopupType() {
    const self = this;
    self.TopupTypeApi.getAllTopupType()
      .then(function (response) {
        let data = response.data.topupsetup;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          var obj = { value: data.id, label: data.topup_type };
          arr.push(obj);
        });
        self.setState({ topuptypes: arr });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  _getAllTopup(page) {
    const self = this; // *
    this.AllTopup.getAllTopup(page)
      .then(function (response) {
        self.setState({
          tempBusiness: response.data.topup,
          data: [...self.state.data, ...response.data.topup],
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          isLoading: false,
          refreshing: false,
          isFooterLoading: false,
        });
      });
  }

  getTopupByID() {
    const self = this; // *
    self.setState({ isLoading: true, isSearched: true });
    const { branch, user, topuptype } = this.state;
    this.AllTopup.getTopupByID(branch.value, user.value, topuptype.value)
      .then(function (response) {
        // console.log(response.data);
        self.setState({
          searchTopup: response.data.topup,
          isLoading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          isLoading: false,
        });
      });
  }

  _handleOnSelectBranch(value, label) {
    this.setState(
      {
        branch: {
          value: value,
          label: label,
        },
      },
      () => this.getTopupByID()
    );
  }
  _handleOnSelectUser(value, label) {
    this.setState({ user: { value: value, label: label } }, () =>
      this.getTopupByID()
    );
  }
  _handleOnSelectTopupType(value, label) {
    this.setState({ topuptype: { value: value, label: label } }, () =>
      this.getTopupByID()
    );
  }
  _handleOnSelectOperator(value, label) {
    this.setState(
      { operator: { value: value, label: label } },
      this.getTopupByID()
    );
  }

  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true, // start top loading
    });
    this.page = 1;
    this._getAllTopup(this.page);
  };
  //retrieve More data
  handleLoadMore = () => {
    this.page = this.page + 1; // increase page by 1
    this._getAllTopup(this.page); // method for API call
  };
  _handleOnClose = () => {
    this.setState({ isOpenSuccessModel: false });
    this._getAllTopup(this.page);
  };
  _handleSearchKeyword = async (keyword) => {
    // alert(keyword);
    const self = this;
    // this.setState({ keyword: keyword });
    var access_token = await AsyncStorage.getItem("access_token");
    let param = {
      keyword: keyword,
      from: "2020-05-1",
      to: "2020-10-30",
    };
    axios
      .post(getAlltopupApi, param, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({ data: response.data.topup });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading
    if (this.state.isFooterLoading) {
      return <ActivityIndicator size="large" style={{ color: "#000" }} />;
    } else {
      return null;
    }
  };
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    const { data } = this.state;
    const dataList = data;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}></StatusBar>
        <Header
          name="Topup"
          Onpress={() => this.props.navigation.navigate("Home")}
        />
        <View style={{ marginTop: 10 }}>
          <View style={styles.searchContainer}>
            <View style={styles.searchTextInput}>
              {/* <Image
                source={require("@images/searchbk.png")}
                style={styles.searchIcon}
              /> */}
              <TextInput
                style={{ flex: 1, height: 40, paddingHorizontal: 10 }}
                placeholder="Search ..."
                value={this.state.keyword}
                onChangeText={(value) => this.setState({ keyword: value })}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#1FD449",
                width: "15%",
                height: 40,
                marginLeft: 10,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => this._handleSearchKeyword(this.state.keyword)}
            >
              <Text style={{ color: "white", fontSize: 15 }}>Search</Text>
            </TouchableOpacity>
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
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.branch}
                    widthContainer="100%"
                    placeholder="Select Branch..."
                    options={this.state.branches}
                    onSelect={(value, label) =>
                      this._handleOnSelectBranch(value, label)
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.operator}
                    options={OPERATORS}
                    widthContainer="100%"
                    marginLeftContainer={5}
                    placeholder="Select Operator..."
                    onSelect={(value, label) =>
                      this._handleOnSelectOperator(value, label)
                    }
                  />
                </View>
              </View>
              <View style={[styles.searchContainer, { marginTop: "2%" }]}>
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.user}
                    widthContainer="100%"
                    placeholder="Select by user"
                    options={this.state.users}
                    onSelect={(value, label) =>
                      this._handleOnSelectUser(value, label)
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.topuptype}
                    options={this.state.topuptypes}
                    widthContainer="100%"
                    marginLeftContainer={5}
                    placeholder="Select topup type"
                    onSelect={(value, label) =>
                      this._handleOnSelectTopupType(value, label)
                    }
                  />
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={({ item }) => (
            <View style={{ marginTop: 10 }}>
              {/* {this._handleOperator(item)} */}
              <TopupCard
                date="1.1.2020"
                branchname={item.branch_name}
                name={item.name}
                operator={
                  item.operator_id == "1"
                    ? "MPT"
                    : item.operator_id == "2"
                    ? "Telenor"
                    : item.operator_id == "3"
                    ? "Ooredoo"
                    : item.operator_id == "4"
                    ? "Mytel"
                    : ""
                }
                topuptype={item.topup_type}
                qty={item.qty}
                onPressEdit={() => this._handleOnPressEdit(1, item)}
                onPressDelete={() => this._handleOnPressDelete(item)}
                arrIndex={1}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={this.renderFilter.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.handleLoadMore()}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("CreateTopup")}
          style={styles.newBtn}
        >
          <Image source={require("@images/add.png")} style={styles.btnImg} />
        </TouchableOpacity>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully topup deleted"
          onClose={() => this._handleOnClose()}
        />
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
