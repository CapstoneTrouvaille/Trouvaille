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

  // console.log("pastTrips - tripInfo", tripInfo);
  // console.log(
  //   "past time figureout ",
  //   Math.floor(Date.now() / 1000) - tripInfo[0].endDate.seconds
  // );
  // console.log("date now in seconds", Math.floor(Date.now() / 1000));
  // console.log("lastdate in trip", tripInfo[0].endDate.seconds);

  // seconds = new Date().getTime() / 1000;
  // {console.log(
  //   "after filter -tripInfo",
  //   tripInfo.filter((trip) => {
  //     Math.floor(Date.now()) - trip.endDate.seconds > 0;
  //   })
  // )}

  return (
    <View style={styles.container}>
      <Center>
        {tripInfo &&
          tripInfo
            .filter((trip) => {
              if (trip.endDate)
                Math.floor(Date.now() / 1000) - trip.endDate.seconds > 0;
            })
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

// const styles = StyleSheet.create({});
