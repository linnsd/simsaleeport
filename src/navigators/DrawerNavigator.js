import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

//import screens
import Customer from "@screens/leftmenu/customer";
import SIMCard from "@screens/leftmenu/SIMCard";
import Topup from "@screens/leftmenu/Topup";
import Home from "@screens/home/Home";

//import components
import DrawerSideBar from "@components/DrawerSideBar";

export default createAppContainer(
  createDrawerNavigator(
    {
      Home: {
        screen: Home,
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
    },
    {
      initialRouteName: "Home",
      contentComponent: DrawerSideBar,
    }
  )
);
