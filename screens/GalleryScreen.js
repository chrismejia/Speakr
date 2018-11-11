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
import {
  FileSystem,
  FaceDetector,
  MediaLibrary,
  Permissions,
  ImageManipulator
} from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import Photo from "../components/Photo";

const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

export default class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    selected: []
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
    // console.log(this.state.photos)
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

  saveToGallery = async () => {
    const photos = this.state.selected;

    // Whenever there are photos selected...
    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        throw new Error("Denied CAMERA_ROLL permissions!");
      }
      console.log("This is photos:");
      console.log(photos);

      const promises = photos.map(photoUri => {
        ImageManipulator.manipulate(photoUri, []);
        return MediaLibrary.createAssetAsync(photoUri);
      });

      const numOfPhotos = promises.length;

      await Promise.all(promises);
      alert(
        numOfPhotos > 1
          ? `${numOfPhotos} photos saved to your gallery!`
          : `${numOfPhotos} photo saved to your gallery!`
      );
    } else {
      alert(
        "No Photos Selected",
        "Please tap to select the photo(s) you'd like to save locally to your device."
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text style={styles.gallerySave}>
              {/* <MaterialIcons name="save" size={30} color="black" /> */}
              Process & Save
            </Text>
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
    justifyContent: "space-between",
    backgroundColor: "springgreen"
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
    alignItems: "center",
    fontSize: 20,
    color: "black"
  }
});
