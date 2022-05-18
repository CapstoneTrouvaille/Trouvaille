import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ItineraryDay = (props) => {
  const itinerary = useSelector((state) => state.itinerary);
  const dayName = Object.keys(itinerary[props.index]).filter(
    (obj) => obj !== "placesFromExplore"
  )[0];

  const plansList = itinerary[props.index][dayName];
  const placesFromExplore = itinerary[props.index].placesFromExplore || [];

  return (
    <View>
      {plansList.map((plan, i) => (
        <Text key={i}>{plan}</Text>
      ))}
      {placesFromExplore.map((value, i) => (
        <Text key={i}>{value}</Text>
      ))}
    </View>
  );
};

export default ItineraryDay;

const styles = StyleSheet.create({});
