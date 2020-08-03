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
import Loading from "@components/Loading";
import SuccessModal from "@components/SuccessModal";
//import Datepicker
import { DrawerActions } from "react-navigation-drawer";
const axios = require("axios");
import {
    getAllNrcCodeApi,
    getAllNrcStateApi,
  } from "@api/Url";
//import components
import NRCCodeCard from "@components/NRCCodeCard";

export default class NRCCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      access_token: "",
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
      isOpenSuccessModel: false,
      nrc_code:"",
      nrcstate:[]
    };
  }
  async componentDidMount() {
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({ access_token: access_token });
    await this.getAllNrcCode();
    await this.getAllNrcState();
  }
  getAllNrcCode = async () => {
    const self = this;
    axios
      .get(getAllNrcCodeApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        // console.log("Get NRC",response.data.nrccode);
        let data = response.data.nrccode;
       
        self.setState({ nrc_code: response.data.nrccode.id });
      })
      .catch(function (err) {
        console.log("NRC Code Error", err);
      });
  };
  getAllNrcState = () => {
    const self = this;
    let bodyParam = {
      nrc_code:self.state.nrc_code,
    };
    // console.log("body",bodyParam);
    axios
      .post(getAllNrcStateApi , bodyParam,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        console.log("NRC State",response.data);
        let data = response.data.nrcstate;
        self.setState({ nrcstates: data });
      })
      .catch(function (err) {
        console.log("NRC State Error", err);
      });
  };
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true, // start top loading
    });
    this._getAllNrcCode();
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this._getAllNrcCode(); // method for API call
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
      this.props.navigation.navigate("NRCCodeEdit", {
        data: item,
      });
    }
  }

  _handleOnPressDelete = async (item) => {
    const self = this;
    axios
      .delete(getAllNrcCodeApi + "/" + item.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        self.setState({
          isOpenSuccessModel: true,
          isLoading: false,
          refreshing: false,
        });
      })
      .catch(function (error) {
        console.log("Delete NRC Code Error", error);
      });
  };

  _handleOnClose = () => {
    this.setState({ isOpenSuccessModel: false });
    this._getAllNrcCode();
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    const { isSearched, data } = this.state;
    const dataList = data;
    return (
      <View style={styles.container}>
        <Header
          name="NRC Code"
          img={require("@images/threeline.png")}
          Onpress={() => this._handleOnPress()}
        />
        <View>
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
            // renderItem={({ item }) => (
            //   // console.log("item card",item.card[0].created_at)
            //   <View style={{ marginTop: 10 }}>
            //     <NRCCodeCard
            //       nrcmm={item.nrc_mm.toString()}
            //       nrcen={item.nrc_en}
            //       onPressEdit={() => this._handleOnPressEdit(1, item)}
            //       onPressDelete={() => this._handleOnPressDelete(item)}
            //       // onPressView={() => this.handleOnPressView(2, item)}
            //       arrIndex={1}
            //     />
            //   </View>
            // )}
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
            text="NRC Code deleted successfully"
            onClose={() => this._handleOnClose()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
