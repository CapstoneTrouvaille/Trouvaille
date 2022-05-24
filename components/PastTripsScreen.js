import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { Button, Center } from "native-base";
import styles from "../styles/currentAndPastTrip";

const PastTripsScreen = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trips.trips);
  const userCurrentTrips = userInfo.trip;

  return (
    <View style={styles.container}>
      <Center>
        {tripInfo &&
          tripInfo
            .filter(
              (trip) => Math.floor(Date.now() / 1000) - trip.endDate.seconds > 0
            )
            .map((trip, index) => (
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

export default PastTripsScreen;
