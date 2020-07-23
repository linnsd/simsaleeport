import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

//import component
import Header from "@components/Header";
import DropDown from "@components/DropDown";
import Card from "@components/CustomerCard";
//import Datepicker
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import styles
import Style from "@styles/Styles";

const CITYS = [{ label: "HO" }, { label: "Linn I" }, { label: "Linn II" }];
export default class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseItem: "",
      chooseIndex: "",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header name="Customer" Onpress={()=>this.props.navigation.navigate("#")}/>
        <ScrollView>
          <View style={styles.secondContainer}>
            <View style={styles.thirdContainer}>
              <TextInput style={styles.textInput}>
                <Text>Search...</Text>
              </TextInput>
              <View style={styles.secondSearchContainer}>
                <Image
                  source={require("@images/search.png")}
                  style={styles.searchImg}
                />
                <TouchableOpacity>
                  <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
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
            <View style={styles.fourthContainer}>
              <DropDown
                value={this.state.chooseItem}
                optionsContainerWidth="47%"
                //   widthContainer="67%"
                placeholder="Select Branch"
                //   heightContainer={40}
                onSelect={(itemvalue, itemIndex) =>
                  this.setState({
                    chooseItem: itemvalue,
                    chooseIndex: itemIndex,
                  })
                }
              />
              <DropDown
                value={this.state.chooseItem}
                optionsContainerWidth="47%"
                widthContainer="100%"
                placeholder="Select Operator"
                //   heightContainer={40}

                onSelect={(itemvalue, itemIndex) =>
                  this.setState({
                    chooseItem: itemvalue,
                    chooseIndex: itemIndex,
                  })
                }
              />
            </View>
            <Card
              date="1.1.2020"
              name="Ma Ma"
              phone="091234554"
              nrc="7/kathakha(N)111111"
              address="Naypyi"
            />
            <Card
              date="1.1.2020"
              name="Ma Ma"
              phone="091234554"
              nrc="7/kathakha(N)111111"
              address="Naypyi"
            />
            <Card
              date="1.1.2020"
              name="Ma Ma"
              phone="091234554"
              nrc="7/kathakha(N)111111"
              address="Naypyi"
            />
            <Card
              date="1.1.2020"
              name="Ma Ma"
              phone="091234554"
              nrc="7/kathakha(N)111111"
              address="Naypyi"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    margin: 10,
    // flex: 1,
  },
  textInput: {
    borderWidth: 1,
    width: "45%",
    margin: 10,
    padding: 10,
    height: 35,
    borderRadius: 5,
    borderColor: "#707070",
  },
  thirdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchImg: {
    width: 30,
    height: 30,
  },
  secondSearchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    flex: 1,
    height: 35,
    // width:"40%",
    alignItems: "center",
    backgroundColor: "#5799FC",
    borderColor: "#5799FC",
    borderRadius: 5,
    marginRight: 10,
  },
  text: {
    color: "#ffffff",
  },
  dateContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    // backgroundColor:"green"
  },
  fourthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    height: 35,
  },
});
