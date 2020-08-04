import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role_id: "",
    };
  }
  async componentDidMount() {
    const role_id = await AsyncStorage.getItem("role_id");
    this.setState({
      role_id: role_id,
    });
  }
  _OnPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.state.role_id == "1" ? "#5A7FEC" : "#5A7FEC",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => this._OnPress()}
          style={{ width: 50 }}
        >
          <Image
            source={
              this.props.img
                ? this.props.img
                : require("@images/back_arrow.png")
            }
            style={{
              width: this.props.widthheader ? this.props.widthheader : 25,
              height: this.props.heightheader ? this.props.heightheader : 25,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // height:50,
    // backgroundColor: "#FE7F0A",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    // flex:1
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    // paddingTop: 30,
  },
  img: {
    width: 25,
    height: 25,
    marginLeft: 10,
    // marginTop: 40,
  },
});
