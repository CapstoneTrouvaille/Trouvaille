import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserToInvite } from "./store/user";
import { useNavigation } from "@react-navigation/core";
import {
  Input,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Center,
  Icon,
  Divider,
} from "native-base";

const InviteTripMember = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const tripInfo = useSelector((state) => state.trip);

  const tripPendingUsers = tripInfo.pendingUsers;

  const [friendEmail, setFriendEmail] = useState("");

  const handleChange = (text) => setFriendEmail(text);

  const handleSubmit = () => {
    console.log(
      `Add friend clicked - friendEmail, TripId:`,
      friendEmail,
      tripId
    );
    dispatch(fetchUserToInvite(friendEmail, tripId));
    // dispatch(addTrip(newTripInfo));
    // navigation.replace("Invite friends");
    setFriendEmail("");
  };

  return (
    <View>
      <VStack w="100%" space={5} alignSelf="center">
        <Center>
          <Heading mt="6" fontSize="xl">
            Invite Trip Members By Email
          </Heading>
          <Input
            size="lg"
            mt="4"
            value={friendEmail}
            w="90%"
            maxW="400px"
            onChangeText={handleChange}
            placeholder="Enter email address"
          />
          <Box mt="6" mb="6" alignItems="center">
            <Button onPress={handleSubmit}>Send Trip Invitation</Button>
          </Box>
          <Divider />
          <Text fontSize="lg" mt="4" mb="4">
            Pending Trip Member Invitations
          </Text>
          {tripPendingUsers &&
            tripPendingUsers.map((userId, index) => (
              <Text key={index}>{userId}</Text>
            ))}
        </Center>
      </VStack>
    </View>
  );
};

export default InviteTripMember;

const styles = StyleSheet.create({});
