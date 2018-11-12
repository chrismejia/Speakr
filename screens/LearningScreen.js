import React from "react";
import { ScrollView, StyleSheet, Text, Image, View } from "react-native";
import speakrLearn from "../assets/speakrLearn.json";

export default class LearningScreen extends React.Component {
  static navigationOptions = {
    title: "Learn"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 350,
            height: 350,
            resizeMode: "contain"
          }}
        />
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
        <Image
          source={require("../assets/images/car.jpg")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  entryFlex: {
    flex: 1,
    width: 300,
    height: 300
  },
  engWord: {
    flex: 1,
    fontSize: 18
  },
  spaWord: {
    flex: 1,
    fontSize: 18
  }
});
