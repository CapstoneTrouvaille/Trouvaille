import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import Login from "../screens/login/LoginScreen";
import SignUp from "../screens/login/SignUpScreen";

const Stack = createNativeStackNavigator();

const SwitchNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
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
