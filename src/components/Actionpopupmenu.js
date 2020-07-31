import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default class ActionPopupMenu extends React.Component {
  handleOnSelect(action) {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.arrIndex, action);
    }
  }

  getActionIcon(action) {
    if (action == "DELETE") {
      return require("@images/deletebk.png");
    } else if (action == "EDIT") {
      return require("@images/editbk.png");
    }
  }

  _renderMenuOptions() {
    let optionsArray = [];
    if (this.props.options) {
      if (this.props.options.length > 0) {
        this.props.options.forEach((data, index) => {
          const actionIcon = this.getActionIcon(data.action);
          optionsArray.push(
            <MenuOption key={index} value={{ action: data.action }}>
              <Image source={actionIcon} style={styles.actionIcon} />
              <Text style={styles.actionLabel}>{data.label}</Text>
            </MenuOption>
          );
        });
      }
    }
    return optionsArray;
  }

  render() {
    return (
      <View>
        <Menu onSelect={({ action }) => this.handleOnSelect(action)}>
          <MenuTrigger customStyles={triggerStyles}>
            <Image
              style={styles.dotIcon}
              source={require("@images/setting.png")}
            />
            {/* <Text style={{ color: "#ffffff", paddingLeft: 10 }}>Action</Text> */}
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{ width: 100, backgroundColor: "#FFFFFF" }}
            customStyles={menuOptionsStyles}
          >
            <ScrollView>{this._renderMenuOptions()}</ScrollView>
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  triggerText: {
    flex: 1,
    fontSize: 16,
  },
  activeText: {
    color: "black",
  },
  inactiveText: {
    color: "red",
  },
  dotIcon: {
    width: 30,
    height: 30,
  },
  actionIcon: {
    width: 20,
    height: 20,
    // marginLeft: 10
  },
  actionLabel: {
    fontSize: 13,
    // fontFamily: Fonts.secondary,
    marginLeft: 10,
  },
});

const triggerStyles = {
  triggerWrapper: {
    // justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width:50,
    height: 40,
    flexDirection: "row",
    justifyContent:"center",
    // justifyContent:"space-around",
    backgroundColor: "#1FD449",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#1FD449",
  },
};

const menuOptionsStyles = {
  optionsWrapper: {},
  optionWrapper: {
    // justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "green",
    borderStyle: "solid",
  },
};
