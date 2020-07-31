import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

const activeOpacity = 0.7;
export default class DeleteConfirmModal extends React.Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View
              style={{
                alignItems: "center"
              }}
            >
              <Image
                source={
                  this.props.headerIcon
                    ? this.props.headerIcon
                    : require("@images/deleteconfirm.png")
                }
                style={styles.modalimg}
              />
            </View>

            {/* <TouchableOpacity
              activeOpacity={activeOpacity}
              style={styles.closeBtn}
              onPress={() => this.props.onClose()}
            >
              <Image
                source={require("@images/cancel.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity> */}

            <Text style={styles.showText}>{this.props.text}</Text>
            <View style={styles.actionBtnContainer}>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                style={styles.actionBtn}
                onPress={() => this.props.onConfirm()}
              >
                <Text style={styles.yesText}>YES</Text>
              </TouchableOpacity>
              <View style={styles.vr} />
              <TouchableOpacity
                activeOpacity={activeOpacity}
                style={styles.actionBtn}
                onPress={() => this.props.notConfirm()}
              >
                <Text style={styles.noText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    height: null,
    borderRadius: 10,
    overflow: "hidden"
  },
  modalimg: {
    width: 35,
    height: 35,
    marginVertical:10
  },
  yesText: {
   
    fontSize: 13,
    color: "red"
  },
  noText: {
    
    fontSize: 13
  },
  showText: {
    minHeight: 40,
    marginTop: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    textAlign: "center",
   
  },
  actionBtnContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor:"gray",
    borderStyle: "solid"
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 40
  },
  vr: {
    height: "100%",
    backgroundColor:"rgba(52, 52, 52, 0.4)",
    width: 1.5
  },
  closeBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    right: 0,
    top: 0
  },
  closeIcon: {
    width: 20,
    height: 20
  }
});
