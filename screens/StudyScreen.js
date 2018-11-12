import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default class StudyScreen extends React.Component {
  static navigationOptions = {
    title: "Study"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Placeholder for Study/Export Screen</Text>
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
