import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Text, Box } from "native-base";
import store from "./components/store";
import { Provider, useSelector } from "react-redux";
import TabNavigator from "./components/navigation/TabNavigator";
import InitialNavigator from "./components/navigation/InitialNavigator";
import { auth } from "./firebase";
import InviteTripMember from "./components/InviteTripMember";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(
    () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // console.log("USER", user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
      return unsubscribe;
    },

    //when you leave the screen it unsubscribes from this listener, doesnt keep pinging it when it shouldn't
    []
  );
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          {isLoggedIn ? <TabNavigator /> : <InitialNavigator />}
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
