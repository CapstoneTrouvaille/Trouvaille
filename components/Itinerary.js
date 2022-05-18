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
import ItineraryForm from "./ItineraryForm";

const Itinerary = (props) => {
  const dispatch = useDispatch();

  // const tripInfo = useSelector((state) => state.trip);
  const itinerary = useSelector((state) => state.itinerary);
  const tripId = props.tripId;

  useEffect(() => {
    dispatch(getItinerary(tripId));
  }, []);

  const populateDays = [];

  for (let i = 0; i < itinerary.length; i++) {
    const dayString =  Object.keys(itinerary[i]).filter(
      (key) => key !== "placesFromExplore"
    )[0]
    populateDays.push(
      <View key={i}>
        <Text bold>
          {
           dayString
          }
        </Text>
        <Box>
          <SelectModal index={i} tripId={tripId} />
          <ItineraryForm key={i} tripId={tripId} day={dayString} />
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
