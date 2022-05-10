import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

//screen stacks
import { ChatStackNavigator, ExploreStackNavigator, HomeStackNavigator, ProfileStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={{
      unmountOnBlur:true
    }}>
    <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
    <Tab.Screen name="ChatTab" component={ChatStackNavigator} />
    <Tab.Screen name="ExploreTab" component={ExploreStackNavigator} />
    <Tab.Screen name = "ProfileTab" component = {ProfileStackNavigator} />
    </Tab.Navigator>

  )
}

export default TabNavigator

const styles = StyleSheet.create({})
