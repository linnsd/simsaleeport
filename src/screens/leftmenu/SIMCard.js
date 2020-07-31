import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import SimcardCard from "@components/SimcardCard";
import Loading from "@components/Loading";
import DeleteConfromModa from "@components/DeleteConfirmModal";

//import services
import { getToken } from "@services/GetToken";

//import Datepicker
import { DrawerActions } from "react-navigation-drawer";
//import Datepicker
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import styles
import Style from "@styles/Styles";
//import api
const axios = require("axios");
import { getSimcardapi, getBranchApi, deleteSimcardApi } from "@api/Url";
import DeleteConfirmModal from "@components/DeleteConfirmModal";

const OPERATOR = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
export default class SIMCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      operator: { value: null, label: null },
      isShow: false,
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
      searchedCustomer: [],
      isSearched: false,
      branchs: [],
      branch: { value: null, label: null },
      changeDate: null,
      secondChangeDate: null,
      keyword: "",
      tempData: [],
      access_token: null,
      arrIndex: null,
      simcard: [],
      isOpenDeleteConfirmModal: false,
      deleteid: [],
    };
    this.page = 1;
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const access_token = await getToken();
    this.setState({ access_token: access_token });
    await this.getSimcard(this.page);
    await this.getAllBranch();
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ isShow: false });
    });
  }
  getSimcard = async (page) => {
    var self = this;
    let bodyparam = {
      from: new Date(),
      to: new Date(),
      page: page,
    };
    axios
      .post(getSimcardapi, bodyparam, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        // console.log("Sim Card",response.data);
        self.setState({
          simcard: response.data.customers,
          data: [...self.state.data, ...response.data.customers],
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          tempData: response.data.customers,
        });
      })
      .catch(function (err) {
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        console.log("SimCard Error", err);
      });
  };

  getAllBranch = async () => {
    const self = this;
    axios
      .get(getBranchApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        let data = response.data.branch;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          // console.log(data);

          var obj = { value: data.id, label: data.branch_name };

          arr.push(obj);
        });
        self.setState({ branchs: arr });
      })
      .catch(function (error) {
        console.log("Branch Api Error", error);
      });
  };

  _handleOnSelectBranch(value, label) {
    this.setState(
      {
        branch: {
          value: value,
          label: label,
        },
      }
      // () => this.getAllCustomerByID()
    );
  }

  _handleOnSelectOperator(value, label) {
    this.setState(
      {
        operator: {
          value: value,
          label: label,
        },
      }
      // () => this.getAllCustomerByID()
    );
  }

  _handleSearchKeyword = async (keyword) => {
    // alert(keyword);
    const self = this;
    // this.setState({ keyword: keyword })
    let param = {
      from: new Date(),
      to: new Date(),
      keyword: keyword,
    };
    axios
      .post(getSimcardapi, param, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        self.setState({ data: response.data.customers });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true, // start top loading
    });
    this.page = 1;
    this.getSimcard(this.page);
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.getSimcard(this.page); // method for API call
  };

  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading
    if (this.state.isFooterLoading) {
      return <ActivityIndicator size="large" style={{ color: "#000" }} />;
    } else {
      return null;
    }
  };

  _handleOnConfirmToDelete() {
    this.setState({
      isOpenDeleteConfirmModal: false,
      isOpenSuccessModal: true,
    });
    let simcard = this.state.simcard;
    const id = simcard[this.state.arrIndex].id;
    const url = deleteSimcardApi + id;
    console.log(simcard);
    axios
      .delete(url,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        alert("Delete Sucessfully");
      })
      .catch(function (error) {
        console.log("Delete Sim Card Error", error);
      });
  }

  _handleOnPressEdit(arrIndex) {
    this.props.navigation.navigate("EditSimCard", {
      data: this.state.simcard[arrIndex],
    });
  }
  _handleOnPressDelete(arrIndex) {
    this.setState({ isOpenDeleteConfirmModal: true, arrIndex });
  }
  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  render() {
    // console.log("Sim Card",this.state.simcard);
    if (this.state.isLoading) {
      return <Loading />;
    }
    const { isSearched, data } = this.state;
    const dataList = data;
    return (
      <View style={styles.container}>
        <Header
          name="Sim Card"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
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
              <Image
                source={require("@images/search.png")}
                style={{ width: 30, height: 30 }}
              />
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
                <View style={styles.dateContainer}>
                  <DatePicker
                    date={this.state.changeDate}
                    mode="date"
                    format="DD-MM-YYYY"
                    maxDate={Moment().endOf("day").toDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={require("@images/calendar.png")}
                    style={Style.datePickerContainer}
                    customStyles={{
                      dateIcon: Style.datePickerDateIcon,
                      dateInput: Style.datePickerDateInput,
                      dateText: Style.datePickerDateText,
                    }}
                    onDateChange={(date) => this.setState({ changeDate: date })}
                  />
                  <DatePicker
                    date={this.state.secondChangeDate}
                    mode="date"
                    format="DD-MM-YYYY"
                    maxDate={Moment().endOf("day").toDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={require("@images/calendar.png")}
                    style={[Style.datePickerContainer, { marginLeft: 10 }]}
                    customStyles={{
                      dateIcon: Style.datePickerDateIcon,
                      dateInput: Style.datePickerDateInput,
                      dateText: Style.datePickerDateText,
                    }}
                    onDateChange={(date) =>
                      this.setState({ secondChangeDate: date })
                    }
                  />
                </View>
              </View>
              <View style={[styles.searchContainer, { marginTop: "2%" }]}>
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.branch}
                    options={this.state.branchs}
                    widthContainer="100%"
                    placeholder="Select Branch..."
                    onSelect={(value, label) =>
                      this._handleOnSelectBranch(value, label)
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <DropDown
                    value={this.state.operator}
                    options={OPERATOR}
                    widthContainer="100%"
                    marginLeftContainer={5}
                    placeholder="Select Operator..."
                    onSelect={(value, label) =>
                      this._handleOnSelectOperator(value, label)
                    }
                  />
                </View>
              </View>
            </View>
          ) : (
            // alert("Hi")
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
          renderItem={({ item, index }) => (
            // console.log("item card",item.card[0].created_at)
            <View style={{ marginTop: 10 }} key={index}>
              <SimcardCard
                date={Moment(item.created_at).format("DD-MM-YYYY")}
                name={item.name}
                nrc={item.fullnrc}
                cardno={item.card_no}
                serialno={item.serial}
                topup={item.topup}
                model={item.model}
                onPressEdit={this._handleOnPressEdit.bind(this)}
                onPressDelete={this._handleOnPressDelete.bind(this)}
                arrIndex={index}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          onEndReached={() => (!isSearched ? this.handleLoadMore() : {})}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("SimCardAdd")}
          style={styles.newBtn}
        >
          <Image source={require("@images/add.png")} style={styles.btnImg} />
        </TouchableOpacity>

        <DeleteConfirmModal
          text="Are you sure delete sim card"
          isOpen={this.state.isOpenDeleteConfirmModal}
          onClose={() => this.setState({ isOpenDeleteConfirmModal: false })}
          notConfirm={() => this.setState({ isOpenDeleteConfirmModal: false })}
          onConfirm={this._handleOnConfirmToDelete.bind(this)}
        />
        {/* </ScrollView> */}
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
  dateContainer: {
    flexDirection: "row",
    // margin: 10,
    justifyContent: "space-between",
    // backgroundColor:"green"
  },
});
