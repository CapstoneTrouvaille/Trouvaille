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
  Stack,
  Center,
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
        <FormControl mt = "15%" mb="4">
          <FormControl.Label>
            EXPLORE
          </FormControl.Label>
          <Input
            value={location}
            size="md"
            placeholder="Enter a city, state, country, etc"
            onChangeText={(text) => setLocation(text)}
          />
        </FormControl>
        <Stack direction="row" space={5} justifyContent="center">
          <Button
            size="sm"
            mb="4"
            onPress={() => {
              handleSubmit();
            }}
          >
            Get Attractions
          </Button>
          <Button size="sm" mb="4" onPress={() => eatHandleSubmit()}>
            Get Restaurants
          </Button>
        </Stack>
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
