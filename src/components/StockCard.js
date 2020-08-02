import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

//import components
import ActionPopupmenu from "@components/Actionpopupmenu";
import DropDown from "@components/DropDown";

const ACTION_POPUP_DATA = [
  //   {label:"View",action:"VIEW"},
  { label: "Edit", action: "EDIT" },
  { label: "Delete", action: "DELETE" },
];

const OPERATOR = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];

export default class StockCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: { value: null, label: null },
    };
  }

  componentDidMount = async () => {
    const operatorid = this.props.operator;

    if (operatorid == "1") {
      this.setState({
        operator: {
          value: operatorid,
          label: "MPT",
        },
      });
    }
    if (operatorid == "2") {
      this.setState({
        operator: {
          value: operatorid,
          label: "Telenor",
        },
      });
    }
    if (operatorid == "3") {
      this.setState({
        operator: {
          value: operatorid,
          label: "Ooredoo",
        },
      });
    }
    if (operatorid == "4") {
      this.setState({
        operator: {
          value: operatorid,
          label: "Mytel",
        },
      });
    }
  };

  _handleOnSelectActionPopup(arrIndex, action) {
    if (action == "EDIT") {
      this.props.onPressEdit(arrIndex);
    } else if (action == "DELETE") {
      this.props.onPressDelete(arrIndex);
    }
    // else if(action == "VIEW"){
    //   this.props.onPressView(arrIndex);
    // }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dateText}>{this.props.date}</Text>
        <View style={styles.secondContainer}>
          <View style={{ width: "40%" }}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Operator</Text>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Stock In</Text>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Stock Out</Text>
            {/* <Text style={[styles.text, { fontWeight: "bold" }]}>Available</Text> */}
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              Description
            </Text>
            {/* <Text style={[styles.text, { fontWeight: "bold" }]}>Topup</Text> */}
            {/* <Text style={[styles.text, { fontWeight: "bold" }]}>Model</Text> */}
          </View>
          <View style={{ width: "60%" }}>
            {/* <DropDown
                  value={this.state.operator}
                  widthContainer="100%"
                  options={Operator}
                  onSelect={(value, label) =>
                    this._handleOnSelectOperator(value, label)
                  }
                  placeholder="Select Operator..."
                ></DropDown> */}
            <Text style={styles.text}>{this.state.operator.label}</Text>
            <Text style={styles.text}>{this.props.stockin}</Text>
            <Text style={styles.text}>{this.props.stockout}</Text>
            {/* <Text style={styles.text}>{this.props.available}</Text> */}
            <Text style={styles.text}>{this.props.description}</Text>
            {/* <Text style={styles.text}>{this.props.topup}</Text> */}
            {/* <Text style={styles.text}>{this.props.model}</Text> */}
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <ActionPopupmenu
            arrIndex={this.props.arrIndex}
            options={ACTION_POPUP_DATA}
            onSelect={this._handleOnSelectActionPopup.bind(this)}
          />
          {/* <TouchableOpacity style={styles.touchBtn}>
            <Image source={require("@images/setting.png")} style={styles.img}/>
            <Text style={styles.btnText}>Action</Text>
        </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#707070",
    padding: 10,
  },
  text: {
    paddingTop: 5,
  },
  secondContainer: {
    // flex:1,
    flexDirection: "row",
  },
  dateText: {
    fontWeight: "bold",
    textAlign: "right",
  },
  touchBtn: {
    flexDirection: "row",
    width: 90,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#1FD449",
    backgroundColor: "#1FD449",
    alignItems: "center",
    padding: 5,
  },
  img: {
    width: 20,
    height: 20,
  },
  btnText: {
    color: "#ffffff",
    paddingLeft: 5,
  },
});
