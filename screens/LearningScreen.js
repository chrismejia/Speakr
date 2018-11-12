import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default class LearningScreen extends React.Component {
  static navigationOptions = {
    title: "Learn"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Placeholder for Processing Screen</Text>
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
