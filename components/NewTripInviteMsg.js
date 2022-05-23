import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Box, Text, Button, View } from "native-base";

const NewTripInviteMsg = () => {
  const navigation = useNavigation();

  const handleOnClick = () => {
    navigation.navigate("Invitations");
  };

  return (
    <View>
      <Box mt="2" pb="3" mb="6" alignItems="center">
        <Button
          size="lg"
          pb="3"
          mb="6"
          variant="link"
          colorScheme="secondary"
          onPress={handleOnClick}
        >
          You Have a Pending Trip Invitation(s)!
        </Button>
      </Box>
    </View>
  );
};

export default NewTripInviteMsg;
