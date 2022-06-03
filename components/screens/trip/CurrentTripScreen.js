import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Center, Box, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/core";
import styles from "../../../styles/currentAndPastTrip";
import { fetchSingleTrip } from "../../store/trip";

const CurrentTripScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trips);
  const userCurrentTrips = userInfo.trip;

  const handleSubmit = (tripId, trip) => {
    dispatch(fetchSingleTrip(tripId));
    navigation.navigate("Trip", {
      trip,
      tripId,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Center>
        {tripInfo &&
          tripInfo
            .filter(
              (trip) =>
                Math.floor(Date.now() / 1000) - trip.endDate.seconds <= 0
            )
            .map((trip, index) => (
              <Button
                key={index}
                variant="outline"
                colorScheme="indigo"
                style={styles.tripList}
                _text={styles.tripButton}
                onPress={() => handleSubmit(userCurrentTrips[index], trip)}
              >
                {trip && trip.tripName}
              </Button>
            ))}
      </Center>
    </ScrollView>
  );
};

export default CurrentTripScreen;
