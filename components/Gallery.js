import React from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert
} from "react-native";
import { FileSystem, ImageManipulator, Permissions } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Photo from "../components/Photo";
import config from "../config.json";
import LearningScreen from "../screens/LearningScreen";

const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

export default class GalleryScreen extends React.Component {
  state = {
    images: {},
    photos: [],
    selected: [],
    lastProcessedImage: "",
    labels: {},
    showLearnScreen: false
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = (uri, isSelected) => {
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    this.setState({ selected });
  };

  toggleView = () =>
    this.setState({
      showLearnScreen: !this.state.showLearnScreen
    });

  renderLearningScreen() {
    return <LearningScreen onPress={this.toggleView.bind(this)} />;
  }

  processImage = async imageUri => {
    try {
      const processedImg = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 480, height: 640 } }],
        { format: "jpeg", base64: true }
      );

      // console.log("BELOW IS THE PROCESSED URI");
      // console.log(processedImg.uri);
      // console.log("BELOW IS THE PROCESSED base64");
      // console.log(processedImg.base64);
      this.setState({ lastProcessedImage: processedImg.base64 });
      const irChecked = await this.checkForLabels(
        this.state.lastProcessedImage
      );
      console.log("\n\nirChecked is:\n\n");
      console.log(irChecked);
    } catch (error) {
      console.log("Image manipulation failed; logs below.");
      console.log(error);
    }
  };

  checkForLabels = async base64Image => {
    try {
      const labels = await fetch(
        config.googleCloud.api + config.googleCloud.apiKey,
        {
          method: "POST",
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Image
                },
                features: [
                  {
                    type: "LABEL_DETECTION",
                    maxResults: 10
                  }
                ]
              }
            ]
          })
        }
      );
      const labelsResponse = labels.json();
      this.setState({ labels: labelsResponse });
      return labelsResponse;
    } catch (error) {
      console.log(
        "\n\nSomething went wrong with the image processing request.\n\n"
      );
      console.log(error);
    }
  };

  saveToGallery = async () => {
    const photos = this.state.selected;

    // Whenever there are photos selected...
    if (photos.length > 1) {
      Alert.alert(
        "Too many photos" /* Title */,
        "Please select only one photo for processing." /* Message */
      );
    } else if (photos.length === 1) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        throw new Error("Denied CAMERA_ROLL permissions!");
      }

      const promises = photos.map(photoUri => {
        try {
          this.processImage(photoUri);
          // return MediaLibrary.createAssetAsync(photoUri);
        } catch (error) {
          console.log(error);
        }
      });

      await Promise.all(promises);
      Alert.alert("Processing", "Your photo is processing. Please wait.", [
        {
          text: "View Results",
          onPress: () => {
            this.renderLearningScreen();
          }
        }
      ]);
    } else {
      Alert.alert(
        "No Photos Selected",
        "Please tap to select the photo you'd like to process."
      );
    }
  };

  renderPhoto = fileName => (
    <Photo
      photos={this.state.photos}
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />
  );

  renderGallery() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.gallerySave}>Choose 1 for Processing</Text>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <MaterialCommunityIcons
              name="file-upload"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(this.renderPhoto)}
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    return this.showLearnScreen
      ? this.renderLearningScreen()
      : this.renderGallery();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    backgroundColor: "white"
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbb03b"
  },
  pictures: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingVertical: 8
  },
  button: {
    padding: 20
  },
  gallerySave: {
    flex: 1,
    alignItems: "center",
    fontSize: 20,
    color: "black"
  }
});
