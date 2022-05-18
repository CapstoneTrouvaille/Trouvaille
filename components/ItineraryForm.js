import { StyleSheet, View } from 'react-native'
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
import { addItineraryDay } from './store/itinerary';

const ItineraryForm = (props) => {
  const dispatch = useDispatch()

  const [plans, setPlans] = useState("");

  const addDays = () => {
    dispatch(addItineraryDay(props.tripId, props.day, plans));
    setPlans("");
  };
  return (
    <View width="80%" >
    <Stack flexDirection="row" space={5}>
     <FormControl mb="4">
        <Input
        width="95%"
          value={plans}
          size="sm"
          placeholder="Add Plans to your itinerary"
          onChangeText={(text) => setPlans(text)}
        />
      </FormControl>

      {/* <Stack direction="row" space={5} justifyContent="center"> */}
        <Button
          size="sm"
          mb="4"
          onPress={() => {
            addDays();
          }}
        >
          Add Plans
        </Button>
      </Stack>
    </View>
  )
}

export default ItineraryForm

const styles = StyleSheet.create({})
