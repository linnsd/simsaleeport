import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import DatePicker from "react-native-datepicker";
import Moment from "moment";

//import styles
import Style from "@styles/Styles";
const Branch = [
  { value: 1, label: "HO" },
  { value: 2, label: "Linn1" },
];
export default class Add extends React.Component {
    
  render() {
    return (
      <View style={styles.container}>
        <Header name="Topup" />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Date*</Text>
              </View>
              <View style={styles.textInputContainer}>
              <DatePicker
                date="1/2/1997"
                mode="date"
                format="DD-MM-YYYY"
                maxDate={Moment().endOf("day").toDate()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require("@images/calendar.png")}
                style={Style.datePickerContainerOne}
                customStyles={{
                  dateIcon: Style.datePickerDateIcon,
                  dateInput: Style.datePickerDateInput,
                  dateText: Style.datePickerDateText,
                }}
                // onDateChange={(date) =>
                //     this.setState({ date })
                //   }
              />
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Branch*</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown value={Branch} widthContainer="100%"></DropDown>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Operator</Text>
              </View>
              <View style={styles.textInputContainer}>
                <DropDown value={Branch} widthContainer="100%"></DropDown>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Name</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>NRC</Text>
              </View>
              <View style={[styles.textInputContainer,{flexDirection:"row",justifyContent:"space-between",flex:1}]}>
              <DropDown value={Branch} widthContainer="95%" placeholder="7"></DropDown>
              <DropDown value={Branch} widthContainer="95%" placeholder="kth"></DropDown>
              <DropDown value={Branch} widthContainer="95%" placeholder="N"></DropDown>
              <TextInput style={styles.nrcTextInput}></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Address</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Contact Phone</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
              
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Sim Card No</Text>
                <Text></Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
                <TextInput style={[styles.textInputStyle,{marginTop:10}]}></TextInput>
              </View>
              
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>IMEI1</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
              
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>IMEI2</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
              
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Topup Amt</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
              
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.labelStyle}>Model</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInputStyle}></TextInput>
              </View>
              
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textContainer}></View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.backBtn}>
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  labelStyle: { fontSize: 19 },
  textInputStyle: {
    borderColor: "#707070",
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor:"#ffffff"
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
  },
  backBtn: {
    backgroundColor: "#5799FC",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#1FD449",
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  nrcTextInput:{
    borderColor: "#707070",
    borderWidth: 1,
    height:35,
    width:"20%",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor:"#ffffff"
  }
});
