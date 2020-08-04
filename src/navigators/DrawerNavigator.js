import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

//import screens
import Customer from "@screens/leftmenu/customer";
import SIMCard from "@screens/leftmenu/SIMCard";
import Topup from "@screens/leftmenu/Topup";
import NRCCode from "@screens/leftmenu/NRCCode";
import NRCState from "@screens/leftmenu/NRCState";
import Stock from "@screens/leftmenu/Stock";
import Home from "@screens/home/Home";
import HDashboardNavigator from "./HDashboardNavigator";

//import components
import DrawerSideBar from "@components/DrawerSideBar";

export default createAppContainer(
  createDrawerNavigator(
    {
      Home: {
        screen: Home,
      },
      HDashboardNavigator:{
        screen:HDashboardNavigator
      },
      Customer: {
        screen: Customer,
      },
      SIMCard: {
        screen: SIMCard,
      },
      Topup: {
        screen: Topup,
      },
      Stock:{
        screen:Stock,
      },
      NRCCode:{
        screen:NRCCode
      },
      NRCState:{
        screen:NRCState
      }
    },
    {
      initialRouteName: "HDashboardNavigator",
      contentComponent: DrawerSideBar,
    }
  )
);
