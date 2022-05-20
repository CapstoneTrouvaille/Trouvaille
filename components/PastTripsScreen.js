import { StyleSheet, Text, View } from "react-native";
// import { Box, Image } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

const PastTripsScreen = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user);
  const tripInfo = useSelector((state) => state.trips);
  const userCurrentTrips = userInfo.trip;

  return (
    <View>
      <Text>PastTripsScreen</Text>
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

export default PastTripsScreen;

const styles = StyleSheet.create({});
