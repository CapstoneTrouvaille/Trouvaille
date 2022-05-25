import { View, Text as ReactNativeText } from "react-native";
import React, { useState } from "react";
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
} from "native-base";
import { auth, firebase } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addTrip } from "./store/trip";
import { useNavigation } from "@react-navigation/core";
import DatePicker from "react-native-datepicker";
import { getDates } from "./helperFunctions/getDates";
import styles from "../styles/addTrip";

const AddTrip = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    const newStartDate = firebase.firestore.Timestamp.fromDate(
      new Date(
        `${startDate.slice(6)}/${startDate.slice(0, 2)}/${startDate.slice(
          3,
          5
        )}`
      )
    );

    const newEndDate = firebase.firestore.Timestamp.fromDate(
      new Date(
        `${endDate.slice(6)}/${endDate.slice(0, 2)}/${endDate.slice(3, 5)}`
      )
    );

    const itineraryDays = getDates(new Date(startDate), new Date(endDate)).map(
      (date) => {
        const obj = {};
        let day = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        obj[day] = [];
        return obj;
      }
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
      Itinerary: itineraryDays,
    };
    if (tripName != "" && location != "" && startDate != "" && endDate != "") {
      dispatch(addTrip(newTripInfo));
      setTripName("");
      setLocation("");
      setStartDate("");
      setEndDate("");

      navigation.navigate("Home");
    } else {
      alert("Please fill out ALL the fields to proceed!");
    }
  };

  return (
    <ScrollView w="100%">
      <Stack style={styles.stack} safeArea>
        <Box alignItems="center">
          <Text style={styles.heading}>Where to next?</Text>
          <Text alignItems="center" style={styles.subtitle}>
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
          <Button
            style={styles.button}
            _text={styles.buttonText}
            size="md"
            onPress={handleSubmit}
          >
            Get Planning!
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default AddTrip;
