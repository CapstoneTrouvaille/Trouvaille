import { View } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Button, ScrollView, Box } from "native-base";
import SelectModal from "./SelectModal";
import { getItinerary } from "./store/itinerary";
import { getDates } from "./helperFunctions/getDates";
import ItineraryDay from "./ItineraryDay";
import ItineraryForm from "./ItineraryForm";
import styles from "../styles/itinerary";

const Itinerary = (props) => {
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itinerary);
  const tripId = props.tripId;

  useEffect(() => {
    dispatch(getItinerary(tripId));
  }, []);

  const populateDays = [];

  for (let i = 0; i < itinerary.length; i++) {
    const dayString = Object.keys(itinerary[i]).filter(
      (key) => key !== "placesFromExplore"
    )[0];
    populateDays.push(
      <View key={i}>
        <Text style={styles.day} fontSize="lg">
          {dayString}
        </Text>
        <Box>
          <SelectModal index={i} tripId={tripId} />
          <ItineraryForm key={i} tripId={tripId} day={dayString} />
        </Box>
        <ItineraryDay index={i} tripId={tripId} day={dayString} />
      </View>
    );
  }

  return (
    <ScrollView>
      <Box>{populateDays}</Box>
    </ScrollView>
  );
};

export default Itinerary;
