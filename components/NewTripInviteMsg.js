import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Box, Text, Button } from "native-base";

const NewTripInviteMsg = () => {
  const navigation = useNavigation();

  const handleOnClick = () => {
    console.log("Accept/Decline button clicked");
    navigation.navigate("InviteAcceptDecline");
  };

  return (
    <View>
      <Box alignItems="center">
        <Button
          size="lg"
          variant="link"
          colorScheme="secondary"
          onPress={handleOnClick}
        >
          Pending Trip Invitation
        </Button>
      </Box>
    </View>
  );
};

export default NewTripInviteMsg;

const styles = StyleSheet.create({});
