import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Checkbox,
  Box,
} from "native-base";
import SelectModal from "./SelectModal";
import { addItineraryDay, getItinerary } from "./store/itinerary";



const Itinerary = (props) => {
  const dispatch = useDispatch()
  const itinerary = useSelector((state) => state.itinerary);
  const tripId = props.tripId
  console.log(itinerary)

  useEffect(() => {
    dispatch(getItinerary(tripId))
  }, []);

  // const days = itinerary length from db
  let days = itinerary.length
  const populateDays = [];
  for (let i = 0; i < days; i++) {
    populateDays.push(<SelectModal num={i+1}/>);
  }

  const addDays = () => {
    console.log("addDAy")
    const key = `Day ${days+1}`
    dispatch(addItineraryDay(tripId, key))
  }

  return (
    <View>
    <Button onPress={addDays}>Add Days</Button>
      <Box>
        {populateDays}
      </Box>
    </View>
  );
};

export default Itinerary;

const styles = StyleSheet.create({});
