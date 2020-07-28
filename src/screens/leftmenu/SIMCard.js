import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import SimcardCard from "@components/SimcardCard";

//import Datepicker
import { DrawerActions } from "react-navigation-drawer";
//import Datepicker
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import styles
import Style from "@styles/Styles";
//import api
const axios = require("axios");
import { getSimcardapi } from "@api/Url";

const BRANCH = [
  { value: 1, label: "HO" },
  { value: 2, label: "Linn1" },
  { value: 3, label: "Linn2" },
];
export default class SIMCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      branch: { value: null, label: null },
      isShow: false,
    };
  }
  _handleOnSelectBranch(value, label) {
    // alert(value);
    this.setState({ branch: { value: value, label: label } });
  }
  async componentDidMount(){
    const {navigation}=this.props;
    this.getSimcard();
    this.focusListener = navigation.addListener("didFocus", async () => {
      await this.setState({ isShow: false });
    });
  }
  getSimcard(){
    var self = this;
    axios
      .get(getSimcardapi, {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYwMTdmZmI0YThkMmRkNGI4MzI5NmI2ODdhNjMyM2ZkZDI2NGNmOTZlM2I3MTQwMDc5ZDZjMTczOTAxOWUxZjJjNTI1YWRjNjZhNmYyNzk4In0.eyJhdWQiOiIxIiwianRpIjoiZjAxN2ZmYjRhOGQyZGQ0YjgzMjk2YjY4N2E2MzIzZmRkMjY0Y2Y5NmUzYjcxNDAwNzlkNmMxNzM5MDE5ZTFmMmM1MjVhZGM2NmE2ZjI3OTgiLCJpYXQiOjE1OTU0NzkwNTUsIm5iZiI6MTU5NTQ3OTA1NSwiZXhwIjoxNjI3MDE1MDU1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.n35bsKhBe5bEvFspMnXFvrBXc1Sq6zjhu4fVOw7j_tJtzN8Myy9Tu6mtF5wt6iOXbFz_oMaf1bYapfcLxaPiNXtJznfw7N2wFaKsAfujs3fPiA4Ipvp8ZsBMH_7mXUJYcz0ad6gQFkFJBuZHRB9-HO94aZdnkdg9aeBvvHNGAS_eX0BhSdwnyTIFvNl5O7v1ndF85lJcOfmGn1ej_WwijWIEfbKa_gcJsDQw7EWFSwEU6IzSwQQZFPFp055soX9M6PbNKvcjZLkG6DaEGZXTrdf3lvGFqbiiYKTqjbktWbOYnfN7vCsL2-3swN6r7DV_JWs-rNXmSC1BMOqAVZTfc2nS8042YBDS_4JG7xQMeqEuQ761-Oyqpr-F6CdyapLB8Wqi1wqyBP1fqbQPAYgtiUbXqQeISO2Tcik2-sHxzFx-hacwdBd7EowMc553UKBags9XBapJ3G_0sqakUTprxvazDLd0HL4MDiapgsULvhrQwDvETdwjrIYRaV66AJFZSLlNhyMHdytxoAR6KcH_RXb3fCFy7MYS1KoUQ4O83NiXX-OW7PivvZ19nlGEPc5ksGxbCsRRc031oM6Oh50pOesBUk_RtrLDZWafzyUZ7mCBHCI7akYYS1WFvuYHvpUqCPWiBKs3RNAddSlKD4z29JKGLmUZ-9rp6huFFrMFSSQ",
        },
      })
      .then(function (response) {
        // self.setState({ data: response.data.customers });
        // console.log(response.data);
      })
      .catch(function (err) {
        alert("Error");
        console.log("Customer Error", err);
      });
  }
  _handleOnPressEdit(){
      this.props.navigation.navigate("EditSimCard")
  }
  _handleOnPressDelete(){
      this.props.navigation.navigate("#")
  }
  _handleOnPress() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
         name="SIM Cards" 
         img={require("@images/threeline.png")}
         Onpress={() => this._handleOnPress()}
        />
        <ScrollView>
        <View style={{ marginTop: 10 }}>
            <View style={styles.searchContainer}>
              <View style={styles.searchTextInput}>
                <Image
                  source={require("@images/searchbk.png")}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={{ flex: 1, height: 40 }}
                  placeholder="Search ..."
                ></TextInput>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ isShow: !this.state.isShow })}
                // style={{ marginLeft: 10 }}
              >
                <Image
                  source={require("@images/more1.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            {this.state.isShow == true ? (
               <View>
               <View style={[styles.searchContainer, { marginTop: 10}]}>
               <View style={styles.dateContainer}>
               <DatePicker
                 date="1/2/1997"
                 mode="date"
                 format="DD-MM-YYYY"
                 maxDate={Moment().endOf("day").toDate()}
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 iconSource={require("@images/calendar.png")}
                 style={Style.datePickerContainer}
                 customStyles={{
                   dateIcon: Style.datePickerDateIcon,
                   dateInput: Style.datePickerDateInput,
                   dateText: Style.datePickerDateText,
                 }}
                 // onDateChange={(date) =>
                 //     this.setState({ date })
                 //   }
               />
               <DatePicker
                 date="1/2/1997"
                 mode="date"
                 format="DD-MM-YYYY"
                 maxDate={Moment().endOf("day").toDate()}
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 iconSource={require("@images/calendar.png")}
                 style={[Style.datePickerContainer, { marginLeft: 10 }]}
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
               <View style={[styles.searchContainer, { marginTop: "2%" }]}>
               <View style={{flex:1}}>
                 <DropDown
                   value={this.state.branch}
                   widthContainer="100%"
                   placeholder="Select Branch..."
                   options={BRANCH}
                   onSelect={(value, label) =>
                     this._handleOnSelectBranch(value, label)
                   }
                 />
                 </View>
                 <View style={{flex:1}}>
 
                 <DropDown
                   value={BRANCH}
                   widthContainer="100%"
                   marginLeftContainer={5}
                   placeholder="Select Operator..."
                 />
                 </View>
               </View>
             </View>
           ) : (
             // alert("Hi")
             <View></View>
           )}

            <SimcardCard
              date="1.1.2020"
              name="Ma Ma"
              nrc="7/kathakha(N)111111"
              cardno="0912434345"
              serialno="00012231221122211"
              topup="1000"
              model="Tecno"
              onPressEdit={this._handleOnPressEdit.bind(this)}
              onPressDelete={this._handleOnPressDelete.bind(this)}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.navigate("SimCardAdd")}
          style={styles.newBtn}
        >
          <Image source={require("@images/add.png")} style={styles.btnImg} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    // flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
    // backgroundColor: "green",
    alignItems: "center",
  },
  searchTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#707070",
    height: 40,
    // marginRight: 10,
    borderRadius: 5,
    // paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  searchBtn: {
    flex: 1,
    backgroundColor: "#5799FC",
    borderColor: "#5799FC",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 50,
    height: 50,
    // backgroundColor: "green",
    resizeMode: "contain",
    // marginRight: 5,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  addContainer: {
    marginTop: "5%",
    paddingHorizontal: 10,
    alignItems: "flex-end",
  },
  addBtn: {
    backgroundColor: "#1FD449",
    height: 42,
    width: "48%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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
  dateContainer: {
    flexDirection: "row",
    // margin: 10,
    justifyContent: "space-between",
    // backgroundColor:"green"
  }
});
