import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTrip, addUserToTrip } from "./store/trip";
import { useNavigation } from "@react-navigation/core";
import { ScrollView, Text, Stack, Center, Button, Heading } from "native-base";

const InviteAcceptDecline = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const tripInfo = useSelector((state) => state.trip);
  const userIdToAdd = "uE6SHKTSy3dvW0jGFwe1QhOozq32";

  useEffect(() => {
    dispatch(fetchSingleTrip(route.params.tripId));
  }, []);

  // console.log(`Line 19 of Invite Accept Decline:`, tripInfo);

  const handleSubmitAccept = () => {
    console.log(`User clicked  ** Invite Accepted ** !!`);
    dispatch(addUserToTrip(route.params.tripId, userIdToAdd));
    navigation.navigate("SingleTrip", { tripId });
  };

  const handleSubmitDecline = () => {
    console.log(`Invite Declined Clicked!!!!`);
  };

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
        <Center>
          <Heading size="lg">
            Accept or Decline the Trip Invitation to {tripInfo.tripName} on{" "}
            {tripInfo.startDate}
          </Heading>
          <Button size="md" mb="4" mt="4" onPress={handleSubmitAccept}>
            Accept Trip Invite
          </Button>
          <Button size="md" mb="4" onPress={handleSubmitDecline}>
            Decline Trip Invite
          </Button>
        </Center>
      </Stack>
    </ScrollView>
  );
};

export default InviteAcceptDecline;

const styles = StyleSheet.create({});
