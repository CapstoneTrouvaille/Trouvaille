import { Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  Input,
  Button,
  Divider,
  ScrollView,
  Stack,
  Center,
} from "native-base";
import { getPlaces } from "../../store/places";
import { getFood } from "../../store/food";
import PlacesResults from "./PlacesResults";
import FoodResults from "./FoodResults";
import styles from "../../../styles/explore";

const ExploreScreen = () => {
  const dispatch = useDispatch();
  const [recommendation, setRecommendation] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    setRecommendation("Places");
    const locationInput = {
      location,
    };
    dispatch(getPlaces(locationInput));
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
        <Center>
          <Text style={styles.exploreText}>Explore</Text>
          <FormControl style={styles.formBox}>
            <Input
              value={location}
              size="sm"
              style={styles.form}
              _text={styles.text}
              placeholder="Enter a city, state, country, etc"
              onChangeText={(text) => setLocation(text)}
            />
          </FormControl>
        </Center>
        <Stack style={styles.buttonContainer}>
          <Button
            size="sm"
            style={styles.button}
            _text={styles.buttonText}
            onPress={() => {
              handleSubmit();
            }}
          >
            Get Attractions
          </Button>
          <Button
            size="sm"
            style={styles.button}
            _text={styles.buttonText}
            onPress={() => eatHandleSubmit()}
          >
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
