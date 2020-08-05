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

const axios = require("axios");
import { getAllDashboardApi } from "@api/Url";
import { acc } from "react-native-reanimated";

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
      operatorid: "",
      dashboard: [],
      access_token: null,
      data: [],
     
    };
  }
  async componentDidMount() {
    const user_name = await AsyncStorage.getItem("name");
    const role_id = await AsyncStorage.getItem("role_id");
    const operator_id = await AsyncStorage.getItem("operator_id");
    const access_token = await AsyncStorage.getItem("access_token");
    this.setState({
      name: user_name,
      roleid: role_id,
      operatorid: operator_id,
      access_token: access_token,
    });
    await this._getAllDashboard();
  }
  _getAllDashboard = async () => {
    const self = this;
    let bodyParam = {
      role_id: this.state.roleid,
      operator_id: this.state.operatorid,
    };
    axios
      .post(getAllDashboardApi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + self.state.access_token,
        },
      })
      .then(function (response) {
        let arr = [];
        var nodata = [0,0,0];
        let datas = response.data.data.length > 0 ? response.data.data : nodata;
        self.setState({
         data:datas
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    // console.log("final",this.state.data);
    // var nodata = [0,0,0];
    // var data = this.state.data.length > 0 ? this.state.data.data : nodata;
    var first = this.state.data.length>0?this.state.data[0]:0;
    var sec =  this.state.data.length>0?this.state.data[1]:0;
    var third =  this.state.data.length>0 ? this.state.data[2] : 0;
    // alert(third);
    // console.log(this.state.data);
    first = parseInt(first);
    sec = parseInt(sec);
    thd =parseInt(third);
    // alert(thd);

    var arrdata = [first,sec,1000];
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
                  data={[20, 45, 100]}
                  labels={["Today", "Monthly", "Yearly"]}
                  width={Dimensions.get("window").width}
                  height={200}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#0E5CF8"
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
                  data={[20, 45, 100]}
                  labels={["Today", "Monthly", "Yearly"]}
                  width={Dimensions.get("window").width}
                  height={200}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#0E5CF8"
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
                  data={[20, 45, 100]}
                  labels={["Today", "Monthly", "Yearly"]}
                  width={Dimensions.get("window").width}
                  height={6000}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#0E5CF8"
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
                  data={[20, 45, 100]}
                  labels={["Today", "Monthly", "Yearly"]}
                  width={Dimensions.get("window").width}
                  height={200}
                  barRadius={5}
                  barWidthPercentage={0.65}
                  barColor="#0E5CF8"
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
                data={arrdata}
                labels={["Today", "Monthly", "Yearly"]}
                width={Dimensions.get("window").width}
                height={200}
                barRadius={5}
                barWidthPercentage={0.65}
                barColor="#0E5CF8"
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
