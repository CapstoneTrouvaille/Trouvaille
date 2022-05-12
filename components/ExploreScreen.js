import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import {
  FormControl,
  Input,
  Button,
  Divider,
  ScrollView,
} from "native-base";
import { getPlaces } from "./store/places";
import { getFood } from "./store/food";
import PlacesResults from "./PlacesResults";
import FoodResults from "./FoodResults";

const ExploreScreen = () => {
  const placesList = useSelector((state) => state.places) || [];
  const foodList = useSelector((state) => state.food) || [];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [recommendation, setRecommendation] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    setRecommendation("Places");
    const locationInput = {
      location,
    };
    dispatch(getPlaces(locationInput));
    // .then( navigation.navigate("Places"));
    setLocation("");
  };

  const eatHandleSubmit = async () => {
    setRecommendation("Food");
    const locationInput = {
      location,
    };
    dispatch(getFood(locationInput));
    setLocation("");
  };

  return (
    <>
      <View>
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
          }}
        >
          Get Attractions
        </Button>
        <Button size="lg" mb="6" onPress={() => eatHandleSubmit()}>
          Get Restaurants
        </Button>
        <Divider mv="8" />
      </View>
      <ScrollView>
        {recommendation === "Places" ? <PlacesResults /> : <FoodResults />}
      </ScrollView>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({});
