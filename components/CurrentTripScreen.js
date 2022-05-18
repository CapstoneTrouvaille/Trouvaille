import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./store/user";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { fetchTrips } from "./store/trip";

const CurrentTripScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trip);
  const userCurrentTrips = userInfo.trip;

  // console.log(` Current Trip Screen:`, userInfo);

  // useEffect(() => {
  //   dispatch(fetchUser(auth.currentUser.uid));
  //   dispatch(fetchTrips());
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchUser(auth.currentUser.uid));
  // }, [tripInfo.successAdd]);

  return (
    <View>
      <Text>Trip's in Progress</Text>
      {userCurrentTrips &&
        userCurrentTrips.map((tripId, index) => (
          <Text
            key={index}
            onPress={() => navigation.navigate("SingleTrip", { tripId })}
          >
            {tripId}
          </Text>
        ))}
    </View>
  );
};

export default CurrentTripScreen;

const styles = StyleSheet.create({});
