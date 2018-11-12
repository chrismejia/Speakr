import React from "react";
import { ScrollView, StyleSheet, Text, Image } from "react-native";

export default class StudyScreen extends React.Component {
  static navigationOptions = {
    title: "Study"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Placeholder for Study/Export Screen</Text>
        <Image
          source={{ uri: "https://i.stack.imgur.com/eiz1c.jpg" }}
          style={{ width: 500, height: 3171, resizeMode: "contain" }}
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
