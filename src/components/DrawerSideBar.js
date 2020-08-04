import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage,
} from "react-native";

const DRAWER_ITEMS = [
  {
    routeName: "Customer",
    label: "Customers",
    image: require("@images/customer.jpg"),
  },
  {
    routeName: "SIMCard",
    label: "SIMCard",
    image: require("@images/card.png"),
  },
  {
    routeName: "Topup",
    label: "Topup",
    image: require("@images/prepaid.png"),
  },
  // {
  //   routeName: "Stock",
  //   label: "Stock",
  //   image: require("@images/stock.jpg"),
  // },
  // {
  //   routeName: "NRCCode",
  //   label: "NRC Code",
  //   image: require("@images/card.png"),
  // },
  // {
  //   routeName: "NRCState",
  //   label: "NRC State",
  //   image: require("@images/secure.png"),
  // },

  {
    routeName: "Logout",
    label: "Logout",
    image: require("@images/logout.jpg"),
    customWidth: 30,
    customHeight: 30,
  },
];
const DRAWER_ITEMS_MYTEL = [
  {
    routeName: "Customer",
    label: "Customers",
    image: require("@images/customer.jpg"),
  },
  {
    routeName: "SIMCard",
    label: "SIMCard",
    image: require("@images/card.png"),
  },
  {
    routeName: "Topup",
    label: "Topup",
    image: require("@images/prepaid.png"),
  },
  {
    routeName: "Logout",
    label: "Logout",
    image: require("@images/logout.jpg"),
    customWidth: 30,
    customHeight: 30,
  },
];

export default class DrawerSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role_id: "",
      name: "",
    };
  }
  async navigate(routeName) {
    if (routeName == "Logout") {
      await AsyncStorage.clear();
      this.props.navigation.navigate("Login");
      return true;
      // console.log(aa);
    } else {
      this.props.navigation.navigate(routeName);
    }
  }

  _renderItem(data, index) {
    return (
      <View key={index}>
        <TouchableOpacity
          style={[styles.linkBtn]}
          onPress={() => this.navigate(data.routeName)}
        >
          <Image source={data.image} style={{ width: 35, height: 35 }} />
          <Text>{data.label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  async componentDidMount() {
    const role_id = await AsyncStorage.getItem("role_id");
    const username = await AsyncStorage.getItem("name");
    this.setState({ role_id: role_id, name: username });
  }

  render() {
    // alert(this.state.role_id);
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            height: 150,
            backgroundColor: this.state.role_id == "1" ? "#73A8DE" : "#73A8DE",
          }}
        >
          <Image source={require("@images/linn.png")} />
          <Text style={{ color: "#ffffff", fontSize: 18 }}>
            {this.state.name}
          </Text>
        </View>
        {this.state.role_id == "1"
          ? DRAWER_ITEMS.map((data, index) => {
              return this._renderItem(data, index);
            })
          : DRAWER_ITEMS_MYTEL.map((data, index) => {
              return this._renderItem(data, index);
            })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linkBtn: {
    height: 40,
    // backgroundColor: "blue",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
});
