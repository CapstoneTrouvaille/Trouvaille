import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserToInvite } from "./store/user";
import { fetchTrips, fetchTripMembers } from "./store/trip";
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
  Spacer,
} from "native-base";

const InviteTripMember = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripInfo = route.params.trip;
  const tripId = route.params.tripId;

  const currentTripMembers = tripInfo.users;
  const pendingUsers = tripInfo.pendingUsers;
  const declinedUsers = tripInfo.declinedUsers;

  console.log(`ID ID ID ID ID:`, currentTripMembers, pendingUsers);
  const tripNames = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(fetchTripMembers(currentTripMembers, pendingUsers, declinedUsers));
  }, []);

  const currentNames = tripNames.cUsers;
  const pendingNames = tripNames.pUsers;
  const declinedNames = tripNames.dUsers;
  console.log(`NAMES NAMES NAMES:`, currentNames, pendingNames);

  const [friendEmail, setFriendEmail] = useState("");

  const handleChange = (text) => setFriendEmail(text);

  const handleHomeOnClick = () => {
    navigation.navigate("Home");
  };

  const handleSubmit = () => {
    console.log(
      `Send Invite Clicked (friendEmail, TripId):`,
      friendEmail,
      tripId
    );
    dispatch(fetchUserToInvite(friendEmail, tripId));
    setFriendEmail("");
  };

  return (
    <View>
      <VStack w="100%" space={5} alignSelf="center">
        <Center>
          <Heading mt="6" fontSize="xl">
            Search for Trip Members by Email
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
          <Text fontSize="xs" mt="4" italic>
            ** User will be prompted to accept/decline your invite via their
            Trouvaille HomeScreen
          </Text>
          <Box mt="2" mb="6" alignItems="center">
            <Button onPress={handleSubmit}>Send Invite</Button>
          </Box>
          <Divider thickness="2" />
          <Text underline fontSize="md" mt="4" mb="4">
            Current Trip Members
          </Text>
          {currentNames &&
            currentNames.map((user, index) => (
              <Text key={index} mb="2">
                {user}
              </Text>
            ))}
          <Divider />
          <Text underline fontSize="md" mt="4" mb="4">
            Pending Trip Member Invitations
          </Text>
          {pendingNames &&
            pendingNames.map((user, index) => (
              <Text key={index} mb="2">
                {user}
              </Text>
            ))}
          <Divider />
          <Text underline fontSize="md" mt="4" mb="4">
            Declined Trip Member Invitations
          </Text>
          {declinedNames &&
            declinedNames.map((user, index) => (
              <Text key={index} mb="6">
                {user}
              </Text>
            ))}
          <Box mt="10" alignItems="center">
            <Button onPress={handleHomeOnClick}>View Trip Dashboard</Button>
          </Box>
        </Center>
      </VStack>
    </View>
  );
};

export default InviteTripMember;
