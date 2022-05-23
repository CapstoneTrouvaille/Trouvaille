import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToTrip, declineInviteToTrip } from "./store/trip";
import { fetchUserPendingTrips } from "./store/trips";
import { useNavigation } from "@react-navigation/core";
import styles from "../styles/inviteScreens";
import {
  ScrollView,
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
  const tripState = useSelector((state) => state.trip);
  const pendingTripNames = useSelector((state) => state.trips.pendingTrips);
  const userPendingTrips = userInfo.pendingTrips;

  useEffect(() => {
    dispatch(fetchUserPendingTrips(userPendingTrips));
  }, [tripState]);

  const handleSubmitAccept = (trip, index) => {
    const tripToDispatch = userPendingTrips[index];
    dispatch(addUserToTrip(tripToDispatch, userInfo.UID));
    navigation.navigate("Home");
  };

  const handleSubmitDecline = (trip, index) => {
    const tripToDispatch = userPendingTrips[index];
    dispatch(declineInviteToTrip(tripToDispatch, userInfo.UID));
    navigation.navigate("Home");
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
          base: "80%",
          md: "25%",
        }}
      >
        <Center>
          <Heading size="md" mb="6">
            Pending Trip Invitations
          </Heading>
          {pendingTripNames &&
            pendingTripNames.map((trip, index) => (
              <View key={index}>
                <Text>
                  You have a pending trip invitation for {trip}. Click below to
                  Accept or Decline.
                </Text>
                <Button
                  style={styles.button}
                  _text={styles.buttonText}
                  size="sm"
                  mb="2"
                  mt="4"
                  onPress={() => handleSubmitAccept(trip, index)}
                >
                  Accept Trip Invite
                </Button>
                <Button
                  style={styles.button}
                  _text={styles.buttonText}
                  size="sm"
                  onPress={() => handleSubmitDecline(trip, index)}
                >
                  Decline Trip Invite
                </Button>
              </View>
            ))}
          <Box mt="20" alignItems="center">
            <Button
              style={styles.button}
              _text={styles.buttonText}
              onPress={handleHomeOnClick}
            >
              View Trip Dashboard
            </Button>
          </Box>
        </Center>
      </Stack>
    </ScrollView>
  );
};

export default InviteAcceptDecline;
