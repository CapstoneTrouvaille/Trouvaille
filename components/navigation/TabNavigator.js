import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screen Stacks
import {
  ChatStackNavigator,
  ExploreStackNavigator,
  HomeStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        // unmountOnBlur:true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#999DC3",
        tabBarInactiveTintColor: "#999DC3",
        tabBarStyle: {
          padding: 10,
          height: 70,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "ChatTab") {
            iconName = focused
              ? "chatbubble-ellipses-sharp"
              : "chatbubble-ellipses-outline";
          } else if (rn === "ExploreTab") {
            iconName = focused ? "map" : "map-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="ChatTab" component={ChatStackNavigator} />
      <Tab.Screen name="ExploreTab" component={ExploreStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
