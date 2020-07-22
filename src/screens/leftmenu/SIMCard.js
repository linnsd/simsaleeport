import React from "react";
import {View,Text,StyleSheet} from "react-native";

export default class SIMCard extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>SIMCard</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    }
})