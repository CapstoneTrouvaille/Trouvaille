import { StyleSheet, View, TouchableOpacity } from "react-native"; //rnfes
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/user";
import { fetchTrips } from "./store/trip";
import AddTrip from "./AddTrip";
import {
  ScrollView,
  Stack,
  FormControl,
  Input,
  Box,
  Divider,
  WarningOutlineIcon,
  Heading,
  Text,
  Button,
  DatePicker,
  Avatar,
} from "native-base";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);
  console.log("userINFO", userInfo);
  // console.log("userINFO", userInfo);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      //*** OMIT BC TAB NAV */
      // .then(() => {
      //   navigation.replace("Login");
      // })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box alignItems="center">
          <Avatar
            bg="purple.600"
            alignSelf="center"
            size="xl"
            source={{
              uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            }}
          >
            RB
          </Avatar>
          <Heading size="xl" mb="4">
            {userInfo.name}'s Trip Dashboard
          </Heading>
          <Text>Email: {auth.currentUser.email}</Text>
          <Divider mb="8" />
          <Box alignItems="center" mb="6">
            <Button
              size="lg"
              mb="6"
              onPress={() => navigation.navigate("AddTrip")}
            >
              Add a Trip
            </Button>
            <Button
              size="lg"
              mb="6"
              onPress={() => navigation.navigate("SingleTrip")}
            >
              Single Trip View
            </Button>
            <Button
              size="lg"
              mb="6"
              onPress={() => navigation.navigate("InviteFriends")}
            >
              Invite Friends
            </Button>
            <Button size="lg" mb="6" onPress={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        </Box>
      </Stack>
    </ScrollView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
