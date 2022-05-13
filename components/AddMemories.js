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
import { useDispatch, useSelector } from "react-redux";
import { addTrip, fetchTrips } from "./store/trip";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import InviteTripMember from "./InviteTripMember";
import Voice from "./Voice";

const AddMemories = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log("PARAMS, ADDMEM", props.route.params.tripId);
  const tripId = props.route.params.tripId;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [journalName, setJournalName] = useState("");
  const [location, setLocation] = useState("");
  const [journalDate, setJournalDate] = useState("");
  const [journal, setJournal] = useState("");

  const journalEntry = useSelector((state) => state.journalEntry);

  //console.log(`TRIPS FROM REDUX!!!:`, trip);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //   const showDatepicker = () => {
  //     showMode("date");
  //   };

  const handleSubmit = () => {
    const newJournalEntry = {
      journalName,
      location,
      journalDate,
      journal,
      //   status: "planning",
      //   tripLead: auth.currentUser.uid,
      //   users: [auth.currentUser.uid],
      //   tripMemories: [],
      //   messages: [],
    };
    console.log(`Get Planning! clicked:`, newJournalEntry);
    dispatch(addTrip(newJournalEntry));
    setJournalName("");
    setLocation("");
    setJournalDate("");
    setJournal("");
    navigation.navigate("Memories");
  };

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
            Post Your Memories
          </Heading>
          <Text alignItems="center" fontSize="xs">
            Add special, funny, memorable moments from your trip!
          </Text>
        </Box>
        <Box>
          <Divider mb="8" />
          <FormControl mb="4">
            <FormControl.Label>Journal Name</FormControl.Label>
            <Input
              value={journalName}
              size="md"
              placeholder="Make it fun!"
              onChangeText={(text) => setJournalName(text)}
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
            <FormControl.Label>Date</FormControl.Label>
            <Input
              value={journalDate}
              size="md"
              placeholder="Enter the date of the moment"
              onChangeText={(text) => setJournalDate(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Journal</FormControl.Label>
            <Input
              value={journal}
              size="lg"
              placeholder="Describe your memorable moment from this trip!"
              onChangeText={(text) => setJournal(text)}
            />
          </FormControl>
          {/* <FormControl mb="4">
            <FormControl.Label>Trip end date 2</FormControl.Label>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          </FormControl> */}
        </Box>
        <Box alignItems="flex-start" mb="6">
          <Voice tripId={tripId} />
        </Box>
        <Box alignItems="center" mb="6">
          <Button size="lg" onPress={handleSubmit}>
            Post your memories
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default AddMemories;

const styles = StyleSheet.create({});
