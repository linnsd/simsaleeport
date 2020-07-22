import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Welcome To Mytel</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F8',
    justifyContent:"center",
    alignItems:"center"
  },
});
