import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Button,
  ScrollView,
  Modal,
  FormControl,
  Input,
  Center,
  Checkbox,
  Box,
  Item,
  Stack,
} from "native-base";
import SelectModal from "./SelectModal";
import { addItineraryDay, getItinerary } from "./store/itinerary";
import { auth, firebase } from "../firebase";
import { getDates } from "./helperFunctions/getDates";
import ItineraryDay from "./ItineraryDay";

const Itinerary = (props) => {
  const dispatch = useDispatch();

  // const tripInfo = useSelector((state) => state.trip);
  const itinerary = useSelector((state) => state.itinerary);
  // const [dayName, setDayName] = useState("");
  // const [plans, setPlans] = useState("");
  const tripId = props.tripId;

  useEffect(() => {
    dispatch(getItinerary(tripId));
  }, []);


  // const addDays = () => {
  //   dispatch(addItineraryDay(tripId, dayName, plans));
  //   setDayName("");
  //   setPlans("");
  // };
  // console.log("Itinerary",Object.keys(itinerary[0]).filter((key)=>key!=="placesFromExplore")[0])

  const populateDays = [];

  for (let i = 0; i < itinerary.length; i++) {
    populateDays.push(
      <View key={i} >
      <Box flexDirection="row">
        <Text bold>
          {
            Object.keys(itinerary[i]).filter(
              (key) => key !== "placesFromExplore"
            )[0]
          }
        </Text>
        <SelectModal index={i} tripId={tripId} />
        </Box>
        <ItineraryDay index={i} tripId={tripId} />
      </View>
    );
  }

  // let start;
  // let end;
  // let datesArray = [];

  // if (tripInfo.startDate) {
  //   start = tripInfo.startDate.toDate();
  //   end = tripInfo.endDate.toDate();
  //   datesArray = getDates(start, end);
  //   datesArray.forEach((date, i) => {
  //     populateDays.push(
  //       <Box key={i}>
  //         <Text bold>
  //           {date.toLocaleDateString("en-US", {
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric",
  //           })}
  //         </Text>
  //         <SelectModal index={i} tripId={tripId} />
  //       </Box>
  //     );
  //   });
  // }

  return (
    <ScrollView>
      {/* <FormControl mb="4">
        <FormControl.Label>Day</FormControl.Label>
        <Input
          value={dayName}
          size="md"
          placeholder="Add a day on your itinerary"
          onChangeText={(text) => setDayName(text)}
        />
        <FormControl.Label>Plans for the day</FormControl.Label>
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
      </Stack> */}
      <Box>{populateDays}</Box>

    </ScrollView>
  );
};

export default Itinerary;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
