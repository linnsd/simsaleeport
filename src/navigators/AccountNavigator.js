import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

//import screens
import Login from "@screens/account/Login";


export default createAppContainer(
  createStackNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions: () => ({
          headerShown:false
        })
      },
    },
    {
      initialRouteName: "Login"
    }
  )
);
