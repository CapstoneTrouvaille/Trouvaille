import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button ,Center} from "native-base";
import { fetchUser } from "./store/user";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { fetchTrips } from "./store/trip";
import { fetchUserTrips } from "./store/trips";
import styles from "../styles/currentTrip";

const CurrentTripScreen = () => {
  const navigation = useNavigation();
  //const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trips);
  const userCurrentTrips = userInfo.trip;

  console.log(` Current Trip Screen:`, userInfo.trip);
  console.log("TRIPINFO", tripInfo);

  console.log("USE CURRENT TRIPS", userCurrentTrips);
  // useEffect(() => {
  //   dispatch(fetchUser(auth.currentUser.uid));
  //   dispatch(fetchTrips());
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchUserTrips(userCurrentTrips));
  // },[userInfo])

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
              navigation.navigate("SingleTrip", {
                trip,
                tripId: userCurrentTrips[index],
              })
            }
          >
            {trip.tripName}
          </Button>
        ))}
        </Center>
    </View>
  );
};

export default CurrentTripScreen;
