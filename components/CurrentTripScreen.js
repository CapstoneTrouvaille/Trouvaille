import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./store/user";
import { auth } from "../firebase";

const CurrentTripScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const userCurrentTrips = userInfo.trip;

  console.log(` Current Trip Screen:`, userInfo);

  useEffect(() => {
    dispatch(fetchUser(auth.currentUser.uid));
  }, []);

  return (
    <View>
      <Text>Trip's in Progress</Text>
      {userCurrentTrips && userCurrentTrips.map((trip) => <Text>{trip}</Text>)}
    </View>
  );
};

export default CurrentTripScreen;

const styles = StyleSheet.create({});
