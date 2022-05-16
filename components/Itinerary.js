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
  Item,
  Stack
} from "native-base";
import SelectModal from "./SelectModal";
import { addItineraryDay, getItinerary } from "./store/itinerary";



const Itinerary = (props) => {
  const dispatch = useDispatch()
  const itinerary = useSelector((state) => state.itinerary);
  const [dayName, setDayName] = useState("")
  const tripId = props.tripId

  useEffect(() => {
    dispatch(getItinerary(tripId))
  }, []);

  // const days = itinerary length from db
  let days = itinerary.length
  const populateDays = [];
  for (let i = 0; i < days; i++) {
    populateDays.push(<SelectModal index={i}/>);
  }

  const addDays = () => {
    console.log(dayName)
    dispatch(addItineraryDay(tripId, dayName))
    setDayName("")
  }

  return (
    <View>
    <FormControl mt = "15%" mb="4">
          <FormControl.Label>
            Day
          </FormControl.Label>
          <Input
            value={dayName}
            size="md"
            placeholder="Add a day on your itinerary"
            onChangeText={(text) => setDayName(text)}
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
    {/* <Button onPress={addDays}>Add Days</Button> */}
      <Box>
        {populateDays}
      </Box>
    </View>
  );
};

export default Itinerary;

const styles = StyleSheet.create({});
