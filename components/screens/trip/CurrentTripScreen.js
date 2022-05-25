import React from "react";
import { useSelector } from "react-redux";
import { Button, Center, Box, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/core";
import styles from "../../../styles/currentAndPastTrip";

const CurrentTripScreen = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trips.trips);
  const userCurrentTrips = userInfo.trip;

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
    </ScrollView>
  );
};

export default CurrentTripScreen;