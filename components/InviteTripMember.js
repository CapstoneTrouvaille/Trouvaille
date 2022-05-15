import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Input,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Center,
  Icon,
  Ionicons,
} from "native-base";

const InviteTripMember = () => {
  const [friendEmail, setFriendEmail] = useState("");

  const handleSubmit = () => {
    console.log(`Add friend clicked:`, friendEmail);
    dispatch(addTrip(newTripInfo));
    navigation.replace("Invite friends");
  };

  return (
    <View>
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Invite friends by email</Heading>
        <Input
          value={friendEmail}
          onChangeText={(e) => setFriendEmail(e.target.value)}
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          borderWidth="0"
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              // as={<Ionicons name="ios-search" />}
            />
          }
        />
        <Box alignItems="center">
          <Button onPress={handleSubmit}>Search friend</Button>
        </Box>
      </VStack>
    </View>
  );
};

export default InviteTripMember;

const styles = StyleSheet.create({});
