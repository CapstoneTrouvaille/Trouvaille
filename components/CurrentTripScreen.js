import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Center } from "native-base";
import { fetchUser } from "./store/user";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { fetchUserTrips } from "./store/trips";
import styles from "../styles/currentAndPastTrip";

const CurrentTripScreen = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trips.trips);
  const userCurrentTrips = userInfo.trip;

  // console.log(` Current Trip Screen:`, userInfo.trip);
  // console.log("TRIPINFO", tripInfo);
  // console.log("USE CURRENT TRIPS", userCurrentTrips);

  return (
    <View style={styles.container}>
      <Center>
        {tripInfo &&
          tripInfo.map((trip, index) => (
            <Button
              key={index}
              variant="outline"
              style={styles.tripList}
              _text={styles.tripButton}
              onPress={() =>
                navigation.navigate("Trip", {
                  trip,
                  tripId: userCurrentTrips[index],
                })
              }
            >

              {trip && trip.tripName}

            </Button>
          ))}
      </Center>
    </View>
  );
};

export default CurrentTripScreen;
