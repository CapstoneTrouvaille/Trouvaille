import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
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

const SingleTrip = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  console.log("PARAMS, SINGLETRIP", tripId);
  const tripInfo = useSelector((state) => state.trip);
  useEffect(() => {
    //right now this is hardcoded, this will need to be fixed
    dispatch(fetchSingleTrip(tripId));
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
            onPress={() =>
              navigation.navigate("Memories", {
                tripId,
              })
            }
          >
            Memories
          </Button>
        </Center>
      </Stack>
    </ScrollView>
  );
};

export default SingleTrip;

const styles = StyleSheet.create({});
