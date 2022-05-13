import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTrip } from "./store/trip";
import {
  ScrollView,
  Stack,
  FormControl,
  Input,
  Box,
  Divider,
  Spacer,
  Heading,
  Text,
  Button,
  Avatar,
  FlatList,
  VStack,
  HStack,
  Center,
} from "native-base";

import { useNavigation } from "@react-navigation/core";
import { db } from "../firebase";
import Voice from "./Voice";
import ImageUpload from "./ImageUpload";

const Memories = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //getting Trip doc id
  const tripInfo = useSelector((state) => state.trip);
  console.log("trip name", tripInfo);
  const [tripDocId, setTripDocId] = useState("");
  async function trip() {
    const tripObj = await db
      .collection("trips")
      .where("tripName", "==", tripInfo.tripName)
      .get();
    console.log("tripObj", await tripObj);
    return tripObj;
  }
  // .then((snapshot) => setTripDocId(snapshot.data()));
  console.log("trip DOc id", trip);

  useEffect(() => {
    //right now this is hardcoded, this will need to be fixed
    dispatch(fetchSingleTrip("TcvY0Vee386lwrFfWajl"));
  }, []);
  const travelers = tripInfo.users || [];

  return (
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="0"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box>
          <Center>
            <Stack space={2}>
              <Heading fontSize="xl" p="4" pb="3">
                {tripInfo.tripName}
              </Heading>
            </Stack>
            <Text fontWeight="400">Location: {tripInfo.location}</Text>
            <Text fontWeight="400">
              {tripInfo.startDate} - {tripInfo.endDate}
            </Text>
            <Text fontWeight="400">Travelers: {travelers}</Text>
          </Center>
        </Box>
        <Center>
          <Button
            size="lg"
            mb="6"
            onPress={() => navigation.navigate("AddMemories")}
          >
            Add a memory
          </Button>
        </Center>
        <Center>
          <Voice />
          Memories
        </Center>
        <Box alignItems="center" mb="6">
          <Button size="lg" onPress={() => navigation.navigate("ImageUpload")}>
            Upload Image
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default Memories;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});
