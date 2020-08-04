import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  ScrollView,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
const screenWidth = Dimensions.get("window").width;

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       data: [100, 125, 120, 250, 119, 1000],
//     },
//   ],
// };

// const chartConfig = {
//   backgroundGradientFrom: "#ffffff",
//   //   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: "#ffffff",
//   backgroundGradientToOpacity: 0.5,
//   color: (opacity = 0.5) => `rgb(1,1,244,${opacity})`,
//   //   strokeWidth: 2, // optional, default 3
//   barPercentage: 0.5,
//   //   useShadowColorFromDataset: false, // optional
// };

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
        <Text style={styles.text}>Sale Report For {this.state.name}</Text>
        <ScrollView>
          {/* <View style={styles.barchartContainer}>
            <BarChart
              // style={graphStyle}
              data={data}
              width={screenWidth}
              height={220}
              //   yAxisLabel="$"
              chartConfig={chartConfig}
              //   verticalLabelRotation={30}
            />
          </View> */}

          {/* <View style={styles.lineChartContiner}>
            <LineChart
              data={data}
              width={screenWidth}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View> */}
          {this.state.roleid == "1" ? (
            <View>
              <View style={styles.barchartContainer}>
                <VerticalBarGraph
                  data={[20, 45, 28, 80, 99, 43]}
                  labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                  width={Dimensions.get("window").width}
                  height={200}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#73A8DE"
                  baseConfig={{
                    hasXAxisBackgroundLines: false,
                    xAxisLabelStyle: {
                      position: "left",
                      // prefix: "$",
                    },
                  }}
                  style={{
                    marginBottom: 30,
                    padding: 10,
                    paddingTop: 20,
                    //   borderRadius: 20,
                    backgroundColor: `#ffffff`,
                    width: Dimensions.get("window").width,
                  }}
                />
              </View>
              <View style={styles.secondBardChart}>
                <VerticalBarGraph
                  data={[20, 45, 28, 80, 99, 43]}
                  labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                  width={Dimensions.get("window").width}
                  height={200}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#73A8DE"
                  baseConfig={{
                    hasXAxisBackgroundLines: false,
                    xAxisLabelStyle: {
                      position: "left",
                      // prefix: "$",
                    },
                  }}
                  style={{
                    marginBottom: 30,
                    padding: 10,
                    paddingTop: 20,
                    //   borderRadius: 20,
                    backgroundColor: `#ffffff`,
                    width: Dimensions.get("window").width,
                  }}
                />
              </View>
              <View style={styles.secondBardChart}>
                <VerticalBarGraph
                  data={[20, 45, 28, 80, 99, 43]}
                  labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                  width={Dimensions.get("window").width}
                  height={200}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#73A8DE"
                  baseConfig={{
                    hasXAxisBackgroundLines: false,
                    xAxisLabelStyle: {
                      position: "left",
                      // prefix: "$",
                    },
                  }}
                  style={{
                    marginBottom: 30,
                    padding: 10,
                    paddingTop: 20,
                    //   borderRadius: 20,
                    backgroundColor: `#ffffff`,
                    width: Dimensions.get("window").width,
                  }}
                />
              </View>
              <View style={styles.secondBardChart}>
                <VerticalBarGraph
                  data={[20, 45, 28, 80, 99, 43]}
                  labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                  width={Dimensions.get("window").width}
                  height={200}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#73A8DE"
                  baseConfig={{
                    hasXAxisBackgroundLines: false,
                    xAxisLabelStyle: {
                      position: "left",
                      // prefix: "$",
                    },
                  }}
                  style={{
                    marginBottom: 30,
                    padding: 10,
                    paddingTop: 20,
                    //   borderRadius: 20,
                    backgroundColor: `#ffffff`,
                    width: Dimensions.get("window").width,
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.barchartContainer}>
              <VerticalBarGraph
                data={[20, 45, 28, 80, 99, 43]}
                labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                width={Dimensions.get("window").width}
                height={200}
                barRadius={5}
                barWidthPercentage={0.65}
                barColor="#73A8DE"
                baseConfig={{
                  hasXAxisBackgroundLines: false,
                  xAxisLabelStyle: {
                    position: "left",
                    // prefix: "$",
                  },
                }}
                style={{
                  marginBottom: 30,
                  padding: 10,
                  paddingTop: 20,
                  //   borderRadius: 20,
                  backgroundColor: `#ffffff`,
                  width: Dimensions.get("window").width,
                }}
              />
            </View>
          )}
        </ScrollView>
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
  secondBardChart: {
    marginTop: 0,
  },
});
