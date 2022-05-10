import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import Login from "../LoginScreen";
import SignUp from "../SignUpScreen";

const Stack = createNativeStackNavigator();

const SwitchNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen options={{ headerShown: false }}
      name="Login" component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  );
};

export default SwitchNavigator;

const styles = StyleSheet.create({});
