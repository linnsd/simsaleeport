import React from "react";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import components
import HeaderLeft from "@components/HeaderLeft";

//import screens
import Home from "@screens/home/Home";
import CreateTopup from "@screens/home/topup/CreateTopup";

//import Navigators
import DrawerNavigator from "./DrawerNavigator";

export default createAppContainer(
  createStackNavigator(
    {
      DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "Linn Sale Report",
          headerStyle: {
            backgroundColor: "#FE7F0A",
          },
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerTitleAlign: {
            alignItems: "center",
            justifyContent: "center",
          },

          headerLeft: () => <HeaderLeft navigation={navigation} />,
        }),
      },
      CreateTopup: {
        screen: CreateTopup,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
    },
    {
      initialRouteName: "Home",
    }
  )
);
