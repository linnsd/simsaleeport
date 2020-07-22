import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
     //Date Picker
  datePickerContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    alignItems:"center",
    justifyContent:"space-between",
    width:"45%",
    height:35,
    borderRadius: 5,
    borderColor:"#707070"
  },
  datePickerDateIcon: {
    height: 20,
    width: 20
  },
  datePickerDateInput: {
    borderWidth: 0,
    justifyContent: "center",
    marginLeft: 10
  },
  datePickerDateText: {
    textAlignVertical: "center",
    textAlign:"center",
    fontSize: 14,
  },
});
export default Styles;