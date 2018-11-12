import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import LearningScreen from "../screens/LearningScreen";
import StudyScreen from "../screens/StudyScreen";
// import LinksScreen from "../screens/LinksScreen";
// import GalleryScreen from "../screens/GalleryScreen";
// import SettingsScreen from "../screens/StudyScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export const LearningStack = createStackNavigator({
  Learn: LearningScreen
});

LearningStack.navigationOptions = {
  tabBarLabel: "Learn",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-list-box` : "md-list-box"}
    />
  )
};

const StudyStack = createStackNavigator({
  Study: StudyScreen
});

StudyStack.navigationOptions = {
  tabBarLabel: "Study",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-book` : "md-book"}
    />
  )
};

const CameraStack = createStackNavigator({
  Camera: CameraScreen
});

CameraStack.navigationOptions = {
  tabBarLabel: "Camera",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-camera${focused ? "" : "-outline"}`
          : "md-camera"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  CameraStack,
  LearningStack,
  StudyStack
});
