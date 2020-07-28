import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

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
  {
    routeName: "Logout",
    label: "Logout",
    image: require("@images/logout.jpg"),
    customWidth: 30,
    customHeight: 30,
  },
];

export default class DrawerSideBar extends React.Component {
  navigate(routeName) {
      if(routeName == "Logout"){
          this.props.navigation.navigate("Login")
      }else{
        this.props.navigation.navigate(routeName);
      }
    
  }

  _renderItem(data, index) {
    return (
      <View  key={index}>
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

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            height: 150,
            backgroundColor: "#FE7F0A",
          }}
        >
          <Image source={require("@images/linn.png")} />
          <Text style={{ color: "#ffffff", fontSize: 15 }}>HO Mytel</Text>
        </View>
        {DRAWER_ITEMS.map((data, index) => {
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
