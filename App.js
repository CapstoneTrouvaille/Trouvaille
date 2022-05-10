import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import AddTrip from "./components/AddTrip";
import Tabs from "./components/Tabs";
import store from "./components/store";
import { Provider } from "react-redux";
import SignUpScreen from "./components/SignUpScreen";
import TabNavigator from "./components/navigation/TabNavigator";
import InitialNavigator from "./components/navigation/InitialNavigator";
import { auth } from "./firebase";

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({isLoggedIn: true})
      } else {
        this.setState({ isLoggedIn:false})
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {this.state.isLoggedIn? <TabNavigator/> : <InitialNavigator/>}
          {/* <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUpScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add a trip" component={AddTrip} />
          <Stack.Screen name = "Tabs" component={Tabs}/>
        </Stack.Navigator> */}
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
