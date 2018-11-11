import React, { Component } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Camera } from "expo";
import Spinner from "react-native-spinkit";

// Where the Google Cloud API key is
import config from "../assets/config.json";

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.takePicture = this.takePicture.bind(this);
  }

  static navigationOptions = {
    title: "Camera"
  };

  render() {
    // Confirm startup and API key readiness
    console.log("Starting app");
    console.log("Google config is:\n", config, "\n##################\n");

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          playSoundOnCapture={false}
        >
          {/* Write  */}
          <View>
            <Text>{this.state.loading}</Text>
          </View>

          {!this.state.loading ? (
            <Text style={styles.capture} onPress={this.takePicture} />
          ) : (
            <View>
              <Spinner
                style={styles.spinner}
                isVisible={true}
                size={70}
                type={"Bounce"}
                color={"white"}
              />
            </View>
          )}
        </Camera>
      </View>
    );
  }

  takePicture() {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });

      const options = {};
      this.camera
        .capture({ metadata: options })
        .then(data => {
          resizeImage(data.path, resizedImageUri => {
            NativeModules.RNImageToBase64.getBase64String(
              resizedImageUri,
              async (err, base64) => {
                // Do something with the base64 string
                if (err) {
                  console.error(err);
                }
                console.log("converted to base64");
                // ToastAndroid.show('converted to base64', ToastAndroid.SHORT);

                let result = await checkForLabels(base64);
                console.log(result);
                // ToastAndroid.show(JSON.stringify(result), ToastAndroid.SHORT);

                //custom filter
                let filteredResult = filterLabelsList(result.responses[0], 0.3);
                displayResult(filteredResult);

                this.setState({
                  loading: false
                });
              }
            );
          });
        })
        .catch(err => console.error(err));
    } else {
      console.log("NO GO" + this.state.loading);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    margin: 50,
    height: 70,
    width: 70,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 15
  },
  spinner: {
    marginBottom: 50
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  bigProjectText: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 50
  },
  getStartedText: {
    fontSize: 18,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
