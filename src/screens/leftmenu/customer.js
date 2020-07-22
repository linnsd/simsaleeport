import React from "react";
import {View,Text,StyleSheet,TextInput,Image} from "react-native";

//import component
import Header from "@components/Header";
//import Datepicker
import DatePicker from "react-native-datepicker";
import Moment from "moment";
//import styles
import Style from "@styles/Styles";

export default class Customer extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Header
                name="Customer"
                />
                <View style={styles.secondContainer}>
                    <View style={styles.thirdContainer}>
                    <TextInput style={styles.textInput}>
                       <Text>Search...</Text>
                   </TextInput>
                   <View style={styles.secondSearchContainer}>
                   <Image source={require("@images/search.png")} style={styles.searchImg}/>
                   <TextInput>
                       <Text style={styles.text}>Search</Text>
                   </TextInput>
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
                    </View>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    secondContainer:{
        margin:10,
        flex:1
    },
    textInput:{
      borderWidth:1,
      width:"45%",
      margin:10,
      padding:10,
      height:35,
      borderRadius:5,
      borderColor:"#707070"

    },
    thirdContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    searchImg:{
        width:30,
        height:30
    },
    secondSearchContainer:{
        flexDirection:"row",
        borderWidth:1,
        flex:1,
        height:35,
        width:"45%",
        alignItems:"center",
        backgroundColor:"#5799FC",
        borderColor:"#5799FC",
        borderRadius:5
    },
    text:{
        color:"white"
    },
    dateContainer:{
        flexDirection:"row",
        margin:10,
        justifyContent:"space-between"
    }
})