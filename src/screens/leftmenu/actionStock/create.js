import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
const axios = require("axios");
import {createStockApi} from "@api/Url";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import SuccessModal from "@components/SuccessModal";
const Operator = [
  { value: 1, label: "MPT" },
  { value: 2, label: "Telenor" },
  { value: 3, label: "Ooredoo" },
  { value: 4, label: "Mytel" },
];
export default class CreateStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: { value: null, label: null },
      isOpenSuccessModel: false,
      role_id:"",
      stockin:"",
      stockout:"",
      derscription:""

    };
  }

  componentDidMount = async () => {
    const roleid = await AsyncStorage.getItem("role_id");
    const operatorid = await AsyncStorage.getItem("operator_id");
    this.setState({role_id:roleid});

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
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
  }

  _handleOnSelectOperator(value, label) {
    if(this.state.role_id == "1"){
      this.setState({
        operator: { value: value, label: label },
      });
    }
   
  }

  _handleOnSave=async()=>{
      const self=this;
      const access_token = await AsyncStorage.getItem("access_token");
      let bodyParam={
        operator_id:this.state.operator.value,
        stock_in:this.state.stockin,
        stock_out:this.state.stockout,
        remark:this.state.derscription
      }
      axios
      .post(createStockApi,bodyParam,{
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
      }) 
      .then(function(response){
          self.setState({
            operator:"",
            stockin:"",
            stockout:"",
            derscription:"",
            isOpenSuccessModel: true,
          })
      })
      .catch(function(err){
          console.log(err);
      })
  }


  render() {
    // console.log(this.state.branches);
    return (
      <View style={styles.container}>
        <Header
          name="Stock"
          Onpress={() => this.props.navigation.navigate("Stock")}
        />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Operator</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown
                  value={this.state.operator}
                  widthContainer="100%"
                  options={Operator}
                  onSelect={(value, label) =>
                    this._handleOnSelectOperator(value, label)
                  }
                  placeholder="Select Operator..."
                ></DropDown>
              </View>
            </View>
          
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Stock In</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                keyboardType="number-pad"
                  style={styles.textInputStyle}
                  value={this.state.stockin}
                  onChangeText={(value) =>
                    this.setState({ stockin: value})
                  }
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Stock Out</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                keyboardType="number-pad"
                  style={styles.textInputStyle}
                  value={this.state.stockout}
                  onChangeText={(value) =>
                    this.setState({ stockout: value})
                  }
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Descrption</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInputStyle}
                  value={this.state.derscription}
                  onChangeText={(value) =>
                    this.setState({ derscription: value})
                  }
                ></TextInput>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => this.props.navigation.navigate("Stock")}
                >
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => this._handleOnSave()}
                >
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <SuccessModal
          isOpen={this.state.isOpenSuccessModel}
          text="Successfully Stock created"
          onClose={() => this._handleOnClose()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  formContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textContainer: {
    width: "30%",
    // alignItems: "flex-end",
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  labelStyle: { fontSize: 15 },
  textInputStyle: {
    borderColor: "#ffffff",
    backgroundColor:"#ffffff",
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
  },
  backBtn: {
    backgroundColor: "orange",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#73A8DE",
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 15,
  },
});
