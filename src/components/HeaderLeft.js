import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
//import Datepicker
import { DrawerActions } from "react-navigation-drawer";

export default class HeaderLeft extends React.Component {
  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this._handleOnPress()}>
        <Image source={require("@images/threeline.png")} style={styles.img} />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
});
