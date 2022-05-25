import { Text, View } from "react-native";
import { Box, Button } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles/itinerary";

const ItineraryDay = (props) => {
  const itinerary = useSelector((state) => state.itinerary);
  const dayName = Object.keys(itinerary[props.index]).filter(
    (obj) => obj !== "placesFromExplore"
  )[0];
  const plansList = itinerary[props.index][dayName];
  const placesFromExplore = itinerary[props.index].placesFromExplore || [];

  return (
    <View>
      <Box style={styles.plansList}>
        {plansList.map((plan, i) => (
          <Text key={i}>{plan}</Text>
        ))}
        {placesFromExplore.map((value, i) => (
          <Text key={i}>{value}</Text>
        ))}

        {placesFromExplore.length > 0 || plansList.length > 0 ? (
          <Button
            size="xs"
            style={styles.editButton}
            _text={styles.buttonText}
            colorScheme="gray"
          >
            <Ionicons name="pencil" size={15} color="white" />
          </Button>
        ) : null}
      </Box>
    </View>
  );
};

export default ItineraryDay;
