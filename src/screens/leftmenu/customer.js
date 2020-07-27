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

// const axios = require("axios");
import CustomerApi from "@api/CustomerApi";

const BRANCH = [
  { value: 1, label: "HO" },
  { value: 2, label: "Linn1" },
  { value: 3, label: "Linn2" },
];
export default class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      branch: { value: null, label: null },
      isShow: false,
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
    };
    this.page = 1;
    this.CustomerApi = new CustomerApi();
  }
  _handleOnSelectBranch(value, label) {
    // alert(value);
    this.setState({ branch: { value: value, label: label } });
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ isShow: false });
    });
    this.setState({ isLoading: true }); // Start page loading
    this.getAllCustomers(this.page);
  }
  getAllCustomers(page) {
    // alert("Hello")
    var self = this;
    this.CustomerApi.getAllCustomer(page)
      .then(function (response) {
        // console.log(response.data)
        self.setState({
          data: response.data.customers,
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
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
  }
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading
    if (this.state.isFooterLoading) {
      return <ActivityIndicator size="large" style={{ color: "#000" }} />;
    } else {
      return null;
    }
  };

  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true, // start top loading
    });
    this.page = 1;
    this.getAllCustomers(this.page);
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.getAllBusiness(this.page); // method for API call
  };

  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <View style={styles.container}>
        <Header
          name="Customer"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        {/* <ScrollView> */}
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
              <View style={[styles.searchContainer, { marginTop: 10}]}>
              <View style={styles.dateContainer}>
              <DatePicker
                date="1/2/1997"
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
                // onDateChange={(date) =>
                //     this.setState({ date })
                //   }
              />
              <DatePicker
                date="1/2/1997"
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
                // onDateChange={(date) =>
                //     this.setState({ date })
                //   }
                />
                </View>
              </View>
              <View style={[styles.searchContainer, { marginTop: "2%" }]}>
              <View style={{flex:1}}>
                <DropDown
                  value={this.state.branch}
                  widthContainer="100%"
                  placeholder="Select Branch..."
                  options={BRANCH}
                  onSelect={(value, label) =>
                    this._handleOnSelectBranch(value, label)
                  }
                />
                </View>
                <View style={{flex:1}}>

                <DropDown
                  value={BRANCH}
                  widthContainer="100%"
                  marginLeftContainer={5}
                  placeholder="Select Operator..."
                />
                </View>
              </View>
            </View>
          ) : (
            // alert("Hi")
            <View></View>
          )}
        </View>
        {/* {this.state.data.map((data, index) => {
          if (data.show) {
            return (
              <View key={index}>
                <Card
                  date={Moment(data.created_at).format("DD-MM-YYYY")}
                  name={data.name}
                  phone={data.phone}
                  nrc={data.fullnrc}
                  address={data.address}
                />
              </View>
            );
          }
          //  alert("hello")
        })} */}
        <FlatList
          showsVerticalScrollIndicator={false}
          // data={dataList}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={({ item }) => (
            <View style={{ marginTop: 10 }}>
              <Card
                data={item}
                // date={Moment(data.created_at).format("DD-MM-YYYY")}
                // name={data.name}
                // phone={data.phone}
                // nrc={data.fullnrc}
                // address={data.address}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={this.renderFilter.bind(this)}
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
    justifyContent:"space-between",
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
  }
});
