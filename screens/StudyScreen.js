import React from "react";
import { ScrollView, StyleSheet, Text, Image } from "react-native";

export default class StudyScreen extends React.Component {
  static navigationOptions = { title: "Study" };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/images/SPage1.png")}
          style={{ width: 500, height: 2000, resizeMode: "contain" }}
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
  }
});
