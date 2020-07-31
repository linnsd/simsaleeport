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
import Card from "@components/CustomerCard";
import Loading from "@components/Loading";
import { DrawerActions } from "react-navigation-drawer";
//import Datepicker
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import styles
import Style from "@styles/Styles";

//import services
import { getToken } from "@services/GetToken";

// const axios = require("axios");
import CustomerApi from "@api/CustomerApi";
import { getBranchApi, getCustomersapi } from "@api/Url";
const axios = require("axios");

const OPERATOR = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
export default class Customer extends React.Component {
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
    };
    this.page = 1;
    this.CustomerApi = new CustomerApi();
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const access_token = await getToken();
    // console.log("Access_Token", access_token);
    this.setState({ access_token: access_token });
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ isShow: false });
    });
    this.setState({ isLoading: true }); // Start page loading
    await this.getAllCustomer(this.page);
    await this.getAllBranch();
  }
  getAllCustomer = async (page) => {
    // console.log(getCustomersapi);
    if (this.state.isSearched) {
      this.setState({
        data: [],
        isSearched: false,
        branch: { value: "", label: "" },
      });
    }
    // alert("Hello")
    var self = this;
    // console.log("Self access_token",self.state.access_token);
    let bodyParam = { page: page };
    axios
      .post(getCustomersapi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      // this.CustomerApi.getAllCustomer(page)
      .then(function (response) {
        console.log("customer", response.data);
        self.setState({
          // data: response.data.customers,
          data: [...self.state.data, ...response.data.customers],
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          tempData: response.data.customers,
        });
        // console.log(response.data.customers);
      })
      .catch(function (err) {
        // alert("Error");
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        console.log("Customer Error", err);
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
    // this.setState({ keyword: keyword });
    // var access_token = await AsyncStorage.getItem("access_token");
    let param = {
      keyword: keyword,
    };
    axios
      .post(getCustomersapi, param, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.state.data,
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
    this.getAllCustomer(this.page);
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.getAllCustomer(this.page); // method for API call
  };

  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  renderFilter() {
    return (
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
               <Image source={require("@images/search.png")} style={{width:30,height:30}}/>
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
    );
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading
    if (this.state.isFooterLoading) {
      return <ActivityIndicator size="large" style={{ color: "#000" }} />;
    } else {
      return null;
    }
  };

  render() {
    // console.log(this.state.access_token);
    if (this.state.isLoading) {
      return <Loading />;
    }
    const { isSearched, data } = this.state;
    const dataList = data;
    return (
      <View style={styles.container}>
        <Header
          name="Customer"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />

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
            // console.log(item)
            <View style={{ marginTop: 10 }}>
              <Card
                // data={item}
                date={Moment(item.created_at).format("DD-MM-YYYY")}
                name={item.name}
                phone={item.phone}
                nrc={item.fullnrc}
                address={item.address}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={this.renderFilter.bind(this)}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.5}
          onEndReached={() => (!isSearched ? this.handleLoadMore() : {})}
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
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // width: "100%",
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
