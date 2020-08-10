import React from "react";
import { View, Text, StyleSheet, AsyncStorage, ScrollView } from "react-native";

const axios = require("axios");
import { getAllDashboardApi } from "@api/Url";

export default class Simcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roleid: "",
      operatorid: "",
      dashboard: [],
      access_token: null,
      data: [],
      today: "",
      month: "",
      year: "",
      mpttoday: "",
      mptmonth: "",
      mptyear: "",
      telenortoday: "",
      telenormonth: "",
      telenoryear: "",
      ooredootoday: "",
      oordeoomonth: "",
      ooredooyear: "",
      myteltoday: "",
      mytelmonth: "",
      mytelyear: "",
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
        // console.log(response.data);
        self.setState({
          today: response.data.data ? response.data.data[0] : "0",
          month: response.data.data ? response.data.data[1] : "0",
          year: response.data.data ? response.data.data[2] : "0",
          mpttoday: response.data.data ? response.data.data[0] : "0",
          mptmonth: response.data.data ? response.data.data[1] : "0",
          mptyear: response.data.data ? response.data.data[2] : "0",

          telenortoday: response.data.data ? response.data.data[3] : "0",
          telenormonth: response.data.data ? response.data.data[4] : "0",
          telenoryear: response.data.data ? response.data.data[5] : "0",

          ooredootoday: response.data.data ? response.data.data[6] : "0",
          oordeoomonth: response.data.data ? response.data.data[7] : "0",
          ooredooyear: response.data.data ? response.data.data[8] : "0",

          myteltoday: response.data.data ? response.data.data[9] : "0",
          mytelmonth: response.data.data ? response.data.data[10] : "0",
          mytelyear: response.data.data ? response.data.data[11] : "0",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    //   console.log(this.state.today);
    return (
      <View style={styles.container}>
        {this.state.roleid == "1" ? (
          <View>
            <ScrollView>
              <Text style={[styles.text, { marginLeft: 10 }]}>For Mpt</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <View style={styles.cardContiner}>
                  <Text>Today</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.mpttoday}</Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Monthly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.mptmonth}</Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Yeraly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.mptyear}</Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.text, { marginLeft: 10 }]}>For Telenor</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <View style={styles.cardContiner}>
                  <Text>Today</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>
                      {this.state.telenortoday}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Monthly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>
                      {this.state.telenormonth}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Yeraly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.telenoryear}</Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.text, { marginLeft: 10 }]}>For Ooredoo</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <View style={styles.cardContiner}>
                  <Text>Today</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>
                      {this.state.ooredootoday}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Monthly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>
                      {this.state.oordeoomonth}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Yeraly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.ooredooyear}</Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.text, { marginLeft: 10 }]}>For Mytel</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <View style={styles.cardContiner}>
                  <Text>Today</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.myteltoday}</Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Monthly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.mytelmonth}</Text>
                  </View>
                </View>
                <View style={styles.cardContiner}>
                  <Text>Yeraly</Text>
                  <View style={styles.thirdContainer}>
                    <Text style={styles.secText}>{this.state.mytelyear}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>
              Report Sim Card For {this.state.name}
            </Text>
            <View style={styles.secondContainer}>
              <View style={styles.cardContiner}>
                <Text>Today</Text>
                <View style={styles.thirdContainer}>
                  <Text style={styles.secText}>{this.state.today}</Text>
                </View>
              </View>
              <View style={styles.cardContiner}>
                <Text>Monthly</Text>
                <View style={styles.thirdContainer}>
                  <Text style={styles.secText}>{this.state.month}</Text>
                </View>
              </View>
              <View style={styles.cardContiner}>
                <Text>Yeraly</Text>
                <View style={styles.thirdContainer}>
                  <Text style={styles.secText}>{this.state.year}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {/* <Text style={styles.text}>Report Sim Card For {this.state.name}</Text>
        <View style={styles.secondContainer}>
          <View style={styles.cardContiner}>
            <Text>Today</Text>
            <View style={styles.thirdContainer}>
              <Text style={styles.secText}>{this.state.today}</Text>
            </View>
          </View>
          <View style={styles.cardContiner}>
            <Text>Monthly</Text>
            <View style={styles.thirdContainer}>
              <Text style={styles.secText}>{this.state.month}</Text>
            </View>
          </View>
          <View style={styles.cardContiner}>
            <Text>Yeraly</Text>
            <View style={styles.thirdContainer}>
              <Text style={styles.secText}>{this.state.year}</Text>
            </View>
          </View>
        </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 10,
    // fontWeight:"bold"
  },
  secondContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thirdContainer: {
    borderWidth: 1,
    width: 100,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderColor: "#5A7FEC",
    backgroundColor: "#5A7FEC",
    //   flex:1
  },
  cardContiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  secText: {
    color: "white",
  },
});
