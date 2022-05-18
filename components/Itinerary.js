import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  ScrollView,
  Modal,
  FormControl,
  Input,
  Center,
  Checkbox,
  Box,
  Item,
  Stack
} from "native-base";
import SelectModal from "./SelectModal";
import { addItineraryDay, getItinerary } from "./store/itinerary";



const Itinerary = (props) => {
  const dispatch = useDispatch()
  const itinerary = useSelector((state) => state.itinerary);
  const [dayName, setDayName] = useState("")
  const [plans, setPlans] = useState("")
  const tripId = props.tripId
  let days = itinerary.length
  // console.log("ITINERARY",itinerary)

  const populateDays = [];
  for (let i = 0; i < days; i++) {
    populateDays.push(<SelectModal key={i} index={i} tripId={tripId}/>);
  }

  useEffect(() => {
    dispatch(getItinerary(tripId))
  }, []);


  const addDays = () => {
    dispatch(addItineraryDay(tripId, dayName, plans))
    setDayName("")
    setPlans("")
  }

  return (
    <ScrollView>
    <FormControl mb="4">
          <FormControl.Label>
            Day
          </FormControl.Label>
          <Input
            value={dayName}
            size="md"
            placeholder="Add a day on your itinerary"
            onChangeText={(text) => setDayName(text)}
          />
          <FormControl.Label>
            Plans for the day
          </FormControl.Label>
          <Input
            value={plans}
            size="md"
            placeholder="Add a day on your itinerary"
            onChangeText={(text) => setPlans(text)}
          />
        </FormControl>

        <Stack direction="row" space={5} justifyContent="center">
          <Button
            size="sm"
            mb="4"
            onPress={() => {
              addDays();
            }}
          >
            Add Days
          </Button>
        </Stack>
      <Box>
        {populateDays}
      </Box>
    </ScrollView>
  );
};

export default Itinerary;

const styles = StyleSheet.create({});
