import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./store/user";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { fetchTrips } from "./store/trip";
import { fetchUserTrips } from "./store/trips";

const CurrentTripScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trips);
  const userCurrentTrips = userInfo.trip;

  console.log(` Current Trip Screen:`, userInfo.trip);
  console.log("tripInfo", tripInfo);

  console.log("userCurrentTrips", userCurrentTrips);
  // useEffect(() => {
  //   dispatch(fetchUser(auth.currentUser.uid));
  //   dispatch(fetchTrips());
  // }, []);

  useEffect(() => {
    dispatch(fetchUserTrips(userCurrentTrips));
  }, []);

  return (
    <View>
      <Text>Trip's in Progress</Text>
      {tripInfo &&
        tripInfo.map((trip, index) => (
          <Text
            key={index}
            onPress={() =>
              navigation.navigate("SingleTrip", {
                trip,
                tripId: userCurrentTrips[index],
              })
            }
          >
            {trip.tripName}
          </Text>
        ))}
    </View>
  );
};

export default CurrentTripScreen;

const styles = StyleSheet.create({});
