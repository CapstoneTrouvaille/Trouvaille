import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTrip, addUserToTrip } from "./store/trip";
import { useNavigation } from "@react-navigation/core";
import {
  ScrollView,
  Text,
  Stack,
  Center,
  Button,
  Heading,
  Divider,
  Box,
} from "native-base";

const InviteAcceptDecline = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);
  //const userIdToAdd = "uE6SHKTSy3dvW0jGFwe1QhOozq32";

  const pendingTripInvites = userInfo.pendingTrips;
  console.log(`Pending Trips:`, pendingTripInvites);

  const handleSubmitAccept = (tripId) => {
    console.log(`User clicked  ** Invite Accepted ** !!`);
    dispatch(addUserToTrip(tripId, userInfo.UID));
    //  navigation.navigate("SingleTrip", { tripId });
  };

  const handleSubmitDecline = () => {
    console.log(`Invite Declined Clicked!!!!`);
  };

  const handleHomeOnClick = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="2"
        safeArea
        mt="0"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Center>
          <Heading size="md" mb="6">
            Pending Trip Invitations
          </Heading>
          {pendingTripInvites &&
            pendingTripInvites.map((invite, index) => (
              <View key={index}>
                <Text>You have a pending trip invitation for {invite}</Text>
                <Button
                  size="sm"
                  mb="4"
                  mt="4"
                  onPress={() => handleSubmitAccept(invite)}
                >
                  Accept Trip Invite
                </Button>
                <Button
                  size="sm"
                  mb="6"
                  onPress={() => handleSubmitDecline(invite)}
                >
                  Decline Trip Invite
                </Button>
              </View>
            ))}
          <Box mt="20" alignItems="center">
            <Button onPress={handleHomeOnClick}>View Trip Dashboard</Button>
          </Box>
        </Center>
      </Stack>
    </ScrollView>
  );
};

export default InviteAcceptDecline;

const styles = StyleSheet.create({});
