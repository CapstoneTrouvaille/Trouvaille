import { StyleSheet, Text, View } from "react-native";
// import { Box, Image } from "native-base";
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

export default PastTripsScreen;

// const styles = StyleSheet.create({});
