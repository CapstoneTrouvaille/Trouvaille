import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Stack,
  FormControl,
  Input,
  Box,
  Divider,
  WarningOutlineIcon,
  Heading,
  Text,
  Button,
  DatePicker,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addTrip } from "./store/trip";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import InviteTripMember from "./InviteTripMember";

const AddTrip = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleSubmit = () => {
    const newTripInfo = {
      tripName,
      location,
      startDate,
      endDate,
      status: "planning",
      tripLead: auth.currentUser.uid,
      users: [auth.currentUser.uid],
      tripMemories: [],
    };
    console.log(`Get Planning! clicked:`, newTripInfo);
    dispatch(addTrip(newTripInfo));
    navigation.replace("Invite friends");
  };

  useEffect(() => {
    console.log(`Use effect unmount started.`);
    return () => {
      setTripName("");
      setLocation("");
      setStartDate("");
      setEndDate("");
    };
  }, []);

  return (
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box alignItems="center">
          <Heading size="2xl" mb="4">
            Where to Next?
          </Heading>
          <Text alignItems="center" fontSize="xs">
            Name your trip, choose a destination, select the dates and Get
            Planning! After you create a trip you can invite your friends and
            get to coordinating!
          </Text>
        </Box>
        <Box>
          <Divider mb="8" />
          <FormControl mb="4">
            <FormControl.Label>Trip Name</FormControl.Label>
            <Input
              value={tripName}
              size="md"
              placeholder="Enter your trip name. Make it fun!"
              onChangeText={(text) => setTripName(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Location</FormControl.Label>
            <Input
              value={location}
              size="md"
              placeholder="Enter the destination"
              onChangeText={(text) => setLocation(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Trip start date</FormControl.Label>
            <Input
              value={startDate}
              size="md"
              placeholder="Enter trip start date"
              onChangeText={(text) => setStartDate(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Trip end date</FormControl.Label>
            <Input
              value={endDate}
              size="md"
              placeholder="Enter trip end date"
              onChangeText={(text) => setEndDate(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Trip end date 2</FormControl.Label>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          </FormControl>
        </Box>
        <Box alignItems="center" mb="6">
          <Button size="lg" onPress={handleSubmit}>
            Get Planning!
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default AddTrip;

const styles = StyleSheet.create({});
