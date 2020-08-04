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
    routeName: "GraphChart",
    tabBarLabel: "Bar Chart",
  },
];
const DRAWER_ITEMS_MYTEL = [
  {
    routeName: "GraphChart",
    tabBarLabel: "Pie Chart",
  },
  {
    routeName: "LineChart",
    tabBarLabel: "Pie Chart",
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
    this.props.navigation.navigate(routeName);
  }

  _renderItem(data, index) {
      alert("Hello")
    return (
      <View key={index}>
        <TouchableOpacity onPress={() => this.navigate(data.routeName)}>
          <Text>{data.tabBarLabel}</Text>
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
    // alert("Hello");
    return (
      <View style={styles.container}>
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
  //   container: {
  //     flex: 1,
  //   },
  linkBtn: {
    height: 40,
    // backgroundColor: "blue",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
});
