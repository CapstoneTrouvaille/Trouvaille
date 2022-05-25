import { View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, Button, FormControl, Input, Stack } from "native-base";
import { addItineraryDay } from "./store/itinerary";
import styles from "../styles/itinerary";

const ItineraryForm = (props) => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState("");

  const addDays = () => {
    if (plans != "") {
      dispatch(addItineraryDay(props.tripId, props.day, plans));
      setPlans("");
    } else {
      alert("Please write something to submit!");
    }
  };

  return (
    <View width="80%">
      <Stack style={styles.formContainer} flexDirection="row">
        <FormControl>
          <Input
            style={styles.form}
            width="90%"
            value={plans}
            size="sm"
            placeholder="Add Plans to your itinerary"
            onChangeText={(text) => setPlans(text)}
          />
        </FormControl>
        <Button
          size="sm"
          style={styles.saveButton}
          _text={styles.buttonText}
          onPress={() => {
            addDays();
          }}
        >
          Add Plans
        </Button>
      </Stack>
    </View>
  );
};

export default ItineraryForm;
