import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Text, Box } from "native-base";
import store from "./components/store";
import { Provider } from "react-redux";
import TabNavigator from "./components/navigation/TabNavigator";
import InitialNavigator from "./components/navigation/InitialNavigator";
import { auth } from "./firebase";
import InviteTripMember from "./components/InviteTripMember";

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
