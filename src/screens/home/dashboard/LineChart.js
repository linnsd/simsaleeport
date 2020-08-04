import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  ScrollView,
} from "react-native";
import { PieChart, ProgressChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "MPT",
    population: 80,
    color: "#274297",
    legendFontColor: "#274297",
    legendFontSize: 15,
  },

  {
    name: "Mytel",
    population: 100,
    color: "#FE7F0A",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Telenor",
    population: 100,
    color: "#01ACFA",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Ooredoo",
    population: 100,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  //   backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0.5) => `rgb(1,1,244,${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
};

export default class GraphChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roleid: "",
    };
  }
  async componentDidMount() {
    const user_name = await AsyncStorage.getItem("name");
    const role_id = await AsyncStorage.getItem("role_id");
    this.setState({
      name: user_name,
      roleid: role_id,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.roleid == "1" ? (
          <View>
            <Text style={styles.text}>Sale Report For {this.state.name}</Text>
            <ScrollView>
              <View style={styles.barchartContainer}>
                <PieChart
                  data={data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </View>
            </ScrollView>
          </View>
        ) : <Text style={{textAlignVertical:"center",flex:1,textAlign:"center"}}>Coming Soon...</Text>}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 15,
    marginLeft: 10,
  },
  barchartContainer: {
    marginTop: 15,
  },
  lineChartContiner: {
    marginTop: 20,
  },
});
