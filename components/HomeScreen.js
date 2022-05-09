import { StyleSheet, Text, View, TouchableOpacity } from "react-native"; //rnfes
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/user";
import AddTrip from "./AddTrip";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.user);
  console.log("userINFO", userInfo);
  // console.log("userINFO", userInfo);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>Welcome, {userInfo.name}</Text>
      {/* <Text>Email: {auth.currentUser.email}</Text> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Add a trip")}
        style={styles.button}
      ></TouchableOpacity>
      <Text style={styles.buttonText}>Add a Trip</Text>

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E9DAC4",
  },
  button: {
    backgroundColor: "#A267AC",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
