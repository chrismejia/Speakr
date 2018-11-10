/*
Source:
http://akhromieiev.com/tutorials/the-10-popular-expo-sdk-snacks/
*/

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, Permissions } from "expo";

// Where the Google Cloud API key is
import config from "../assets/config.json";

export default class CameraExample extends React.Component {
  state = { hasCameraPermission: null, type: Camera.Constants.Type.back };

  // // add title to title bar
  // static navigationOptions = {
  //   title: "Camera"
  // };
  static navigationOptions = { header: null };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  }

  render() {
    // Confirm startup and API key readiness
    console.log("Starting app");
    console.log("Google config is:\n", config, "\n##################\n");

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.viewContainer}>
          <Camera
            style={styles.cameraContainer}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text style={styles.flipButtonText}> Flip </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Text>Button area</Text>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  cameraContainer: {
    flex: 1
  },
  buttonContainer: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray"
  },
  flipButtonText: {
    fontSize: 24,
    marginBottom: 25,
    color: "white"
  }
});
