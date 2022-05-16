import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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



const Itinerary = () => {
  // const days = itinerary length from db
  let days = 5
  const populateDays = [];
  for (let i = 0; i < days; i++) {
    populateDays.push(<SelectModal num={i+1}/>);
  }

  const addDays = () => {
    console.log("addDAy")
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
