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
  AsyncStorage,
} from "react-native";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import StockCard from "@components/StockCard";
import Loading from "@components/Loading";
import SuccessModal from "@components/SuccessModal";

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
import {getAllStockApi, deleteSimcardApi } from "@api/Url";
import AllSimCard from "@api/AllSimcard";
import DeleteConfirmModal from "@components/DeleteConfirmModal";

const OPERATOR = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
export default class Stock extends React.Component {
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
      changeDate: null,
      secondChangeDate: null,
      keyword: "",
      tempData: [],
      access_token: null,
      arrIndex: null,
      simcard: [],
      isOpenDeleteConfirmModal: false,
      deleteid: [],
      isOpenSuccessModel: false,
      searchSimCard: [],
    };
  }
  async componentDidMount() {
    const access_token = await getToken();
    this.setState({ access_token: access_token});
    await this.getAllStock();
  }
  getAllStock = async (page) => {
    var self = this;
    axios
    .get(getAllStockApi,{
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.access_token,
          },
    })
      .then(function (response) {
        // console.log("Stock Data",response.data.stocks);
        self.setState({
          data: [...self.state.data, ...response.data.stocks],
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
          tempData: response.data.stocks,
        });
      })
      .catch(function (err) {
        self.setState({
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
        // console.log("SimCard Error", err);
      });
  };

 
 
  _handleOnSelectOperator(value, label) {
    this.setState(
      {
        operator: {
          value: value,
          label: label,
        },
      },
    );
  }

  
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true, // start top loading
    });
    this.getAllStock();
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.getAllStock(); // method for API call
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
  _handleOnPressEdit(arrIndex, item) {
    // console.log(item);
    if (arrIndex == 1) {
      this.props.navigation.navigate("StockEdit", {
        data: item,
      });
    }
  }

//   handleOnPressView(arrIndex, item) {
//     if (arrIndex == 2) {
//       this.props.navigation.navigate("StockView", {
//         data: item,
//       });
//     }
//   }
  _handleOnPressDelete = async (item) => {
    const self = this;
    axios
      .delete(getAllStockApi +"/"+item.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({ isOpenSuccessModel: true });
      })
      .catch(function (error) {
        console.log("Delete Sim Card Error", error);
      });
  };
  _handleOnClose = () => {
    this.setState({ isOpenSuccessModel: false });
    this.getAllStock();
  };

  render() {
    // console.log("Branch id",this.state.branch.value);
    if (this.state.isLoading) {
      return <Loading />;
    }
    const { isSearched, data} = this.state;
    const dataList =  data;
    return (
      <View style={styles.container}>
        <Header
          name="Stock"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />

        {/* <View style={[styles.searchContainer, { marginTop: "2%" }]}>
          <View style={{ flex: 1 }}>
            <DropDown
              value={this.state.operator}
              options={OPERATOR}
              widthContainer="97%"
              optionsContainerWidth="90%"
              marginLeftContainer={5}
              placeholder="Select Operator"
              onSelect={(value, label) =>
                this._handleOnSelectOperator(value, label)
              }
            />
          </View>
        </View> */}

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
            // console.log("item card",item.card[0].created_at)
            <View style={{ marginTop: 10 }}>
              <StockCard
                date={Moment(item.created_at).format("DD-MM-YYYY")}
                operator={item.operator_id}
                stockin={item.stock_in}
                stockout={item.stock_out}
                description={item.remark}
                onPressEdit={() => this._handleOnPressEdit(1, item)}
                onPressDelete={() => this._handleOnPressDelete(item)}
                // onPressView={() => this.handleOnPressView(2, item)}
                arrIndex={1}
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
          onPress={() => this.props.navigation.navigate("StockCreate")}
          style={styles.newBtn}
        >
          <Image source={require("@images/add1.png")} style={styles.btnImg} />
        </TouchableOpacity>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully Stock deleted"
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
  dateContainer: {
    flexDirection: "row",
    // margin: 10,
    justifyContent: "space-between",
    // backgroundColor:"green"
  },
});
