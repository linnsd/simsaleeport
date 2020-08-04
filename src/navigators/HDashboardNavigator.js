import React from "react";
import { createAppContainer, NavigationEvents } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import components
import HeaderLeft from "@components/HeaderLeft";

import DashboardNavigator from "./DashoarbNavigator";

export default createAppContainer(
  createStackNavigator(
    {
      DashboardNavigator: {
        screen: DashboardNavigator,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "Linn Sale Report",
          headerStyle: {
            backgroundColor: "#73A8DE",
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
    },
    {
      initialRouteName: "DashboardNavigator",
    }
  )
);
