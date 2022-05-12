import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/core";
import { Button } from "native-base";
import {
  getPlacesData,
  getLocationId,
  getRestaurantsData,
} from "./api/tripAdvisor";
import { FormControl, Input } from "native-base";
import { getPlaces } from "./store/places";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    console.log("LOCATION IN SCREEN:",location)
    const locationInput = {
      location,
    };
    dispatch(getPlaces(locationInput));
    setLocation("")
  };

  return (
    <View>
      <Text>ExploreScreen</Text>
      <FormControl mb="4">
        <FormControl.Label>Trip Name</FormControl.Label>
        <Input
          value={location}
          size="md"
          placeholder="Explore attractions and activities!"
          onChangeText={(text) => setLocation(text)}
        />
      </FormControl>
      <Button
        size="lg"
        mb="6"
        onPress={() => {
          handleSubmit();
          navigation.navigate("Places");
        }}
      >
        Get Attractions
      </Button>
      <Button size="lg" mb="6" onPress={() => getRestaurantsData()}>
        Get Restaurants
      </Button>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({});
