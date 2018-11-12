import React from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Layout from "../constants/Layout";

const pictureSize = 150;

const imageInfo = [];

export default class Photo extends React.Component {
  state = {
    selected: false,
    image: null
  };
  _mounted = false;

  componentDidMount() {
    imageInfo.push("image");
    console.log(this.state.image);
    console.log(imageInfo);
    this._mounted = true;
  }

  componentWillUnmount() {
    console.log(this.state.image);
    this._mounted = false;
  }

  toggleSelection = () => {
    this.setState({ selected: !this.state.selected }, () =>
      this.props.onSelectionToggle(this.props.uri, this.state.selected)
    );
  };

  getImageDimensions = ({ width, height }) => {
    if (width > height) {
      const scaledHeight = (pictureSize * height) / width;
      return {
        width: pictureSize,
        height: scaledHeight,

        scaleX: pictureSize / width,
        scaleY: scaledHeight / height,

        offsetX: 0,
        offsetY: (pictureSize - scaledHeight) / 2
      };
    } else {
      const scaledWidth = (pictureSize * width) / height;
      return {
        width: scaledWidth,
        height: pictureSize,

        scaleX: scaledWidth / width,
        scaleY: pictureSize / height,

        offsetX: (pictureSize - scaledWidth) / 2,
        offsetY: 0
      };
    }
  };

  render() {
    const { uri } = this.props;
    return (
      <TouchableOpacity
        style={styles.pictureWrapper}
        onPress={this.toggleSelection}
        activeOpacity={1}
      >
        <Image style={styles.picture} source={{ uri }} />
        {this.state.selected && (
          <MaterialCommunityIcons
            name="plus-circle"
            size={50}
            color="springgreen"
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: "contain"
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  }
});
