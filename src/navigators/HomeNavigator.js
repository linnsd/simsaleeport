import React from "react";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import components
import HeaderLeft from "@components/HeaderLeft";

//import screens
import Home from "@screens/home/Home";
import CreateTopup from "@screens/home/topup/CreateTopup";
import EditTopup from "@screens/home/topup/EditTopup";
import SimCardAdd from "@screens/leftmenu/actionSimCard/Add";
import EditSimCard from "@screens/leftmenu/actionSimCard/Edit";
import SimCardView from "@screens/leftmenu/actionSimCard/View";
import StockCreate from "@screens/leftmenu/actionStock/create";
import StockEdit from "@screens/leftmenu/actionStock/edit";
import NRCCodeEdit from "@screens/leftmenu/actionNrcCode/edit";
import NRCCodeAdd from "@screens/leftmenu/actionNrcCode/add";


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
      EditTopup: {
        screen: EditTopup,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      SimCardAdd: {
        screen: SimCardAdd,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      EditSimCard: {
        screen: EditSimCard,
        navigationOptions: ({ navigation }) => ({
          headerShown: false,
        }),
      },
      SimCardView:{
        screen:SimCardView,
        navigationOptions:({navigation})=>({
          headerShown:false,
        })
      },
      StockCreate:{
        screen:StockCreate,
        navigationOptions:({navigation})=>({
          headerShown:false,
        })
      },
      StockEdit:{
        screen:StockEdit,
        navigationOptions:({navigation})=>({
          headerShown:false,
        })
      },
      NRCCodeEdit:{
        screen:NRCCodeEdit,
        navigationOptions:({navigation})=>({
          headerShown:false,
        })
      },
      NRCCodeAdd:{
        screen:NRCCodeAdd,
        navigationOptions:({navigation})=>({
          headerShown:false,
        })
      }
  

    },
    {
      initialRouteName: "DrawerNavigator",
    }
  )
);
