import { StyleSheet, View, Text as ReactNativeText } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Stack,
  FormControl,
  Input,
  Box,
  Divider,
  Heading,
  Text,
  Button,
  //DatePicker,
} from "native-base";
//import DateTimePicker from "@react-native-community/datetimepicker";
import { auth, firebase } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addTrip, fetchTrips } from "./store/trip";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import InviteTripMember from "./InviteTripMember";
import InviteAcceptDecline from "./InviteAcceptDecline";
import NewTripInviteMsg from "./NewTripInviteMsg";
import DatePicker from "react-native-datepicker";
//native base doesn't have a date picker so you have to use the react native one

const AddTrip = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [date, setDate] = useState("05-16-2022");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const trip = useSelector((state) => state.trip);
  const tripId = trip.id;

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
    //need to change date to yyyy-mm-dd format to put into date function
    const newStartDate = firebase.firestore.Timestamp.fromDate(
      new Date(
        `${startDate.slice(6)}-${startDate.slice(0, 2)}-${startDate.slice(
          3,
          5
        )}`
      )
    );

    const newEndDate = firebase.firestore.Timestamp.fromDate(
      new Date(
        `${endDate.slice(6)}-${endDate.slice(0, 2)}-${endDate.slice(3, 5)}`
      )
    );

    const newTripInfo = {
      tripName,
      location,
      startDate: newStartDate,
      endDate: newEndDate,
      status: "planning",
      tripLead: auth.currentUser.uid,
      users: [auth.currentUser.uid],
      pendingUsers: [],
      declinedUsers: [],
      tripMemories: [],
      messages: [],
      Itinerary: [],
    };
    if (tripName != "" && location != "" && startDate != "" && endDate != "") {
      console.log(`Get Planning! clicked:`, newTripInfo);
      dispatch(addTrip(newTripInfo));
      setTripName("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      // navigation.navigate("InviteTripMember", { tripId });
      navigation.navigate("Home");
    } else {
      alert("Please fill out ALL the fields to proceed!");
    }
  };

  console.log(Date.now());

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
        </Box>
        <View style={styles.container}>
          <ReactNativeText style={styles.text}>
            Trip Start Date :
          </ReactNativeText>
          <DatePicker
            style={styles.datePickerStyle}
            date={startDate}
            mode="date"
            placeholder="select start date"
            format="MM/DD/YYYY"
            minDate="01-01-2022"
            maxDate="01-01-3022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor: "gray",
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              placeholderText: {
                fontSize: 17,
                color: "gray",
              },
              dateText: {
                fontSize: 17,
              },
            }}
            onDateChange={(date) => {
              setStartDate(date);
            }}
          />
        </View>

        <View style={styles.container}>
          <ReactNativeText style={styles.text}>Trip End Date :</ReactNativeText>
          <DatePicker
            style={styles.datePickerStyle}
            date={endDate}
            mode="date"
            placeholder="select start date"
            format="MM/DD/YYYY"
            minDate="01-01-2022"
            maxDate="01-01-3022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor: "gray",
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              placeholderText: {
                fontSize: 17,
                color: "gray",
              },
              dateText: {
                fontSize: 17,
              },
            }}
            onDateChange={(date) => {
              setEndDate(date);
            }}
          />
        </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A8E9CA",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    color: "#000",
  },
});
