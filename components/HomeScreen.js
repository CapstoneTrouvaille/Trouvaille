import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native"; //rnfes
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserToInvite } from "./store/user";
import { fetchTrips } from "./store/trip";
import {
  Stack,
  Box,
  Divider,
  Heading,
  Text,
  Button,
  Avatar,
  useColorModeValue,
  Center,
} from "native-base";

import { signOut } from "firebase/auth";
import { logoutUser } from "./store";

import { TabView, SceneMap } from "react-native-tab-view";
import CurrentTripScreen from "./CurrentTripScreen";
import PastTripsScreen from "./PastTripsScreen";
import NewTripInviteMsg from "./NewTripInviteMsg";
import { getSavedItems } from "./store/saved";
import { fetchUserTrips } from "./store/trips";
import styles from "../styles/homeScreen";
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);
  const tripsInfo = useSelector((state) => state.trips);
  const userCurrentTrips = userInfo.trip;
  const showPendingTrips = userInfo.pendingTrips
    ? userInfo.pendingTrips.length
    : 0;

  useEffect(() => {
    dispatch(fetchTrips());
    dispatch(getSavedItems());
    dispatch(fetchUserTrips(userInfo.trip));
  }, []);

  useEffect(() => {
    dispatch(fetchUser(auth.currentUser.uid));
  }, [tripsInfo.successAdd]);

  useEffect(() => {
    dispatch(fetchUserTrips(userCurrentTrips));
  }, [userInfo]);

  const handleSignOut = () => {
    dispatch(logoutUser());
    // console.log("userinfo should be empty", userInfo);
    signOut(auth)
      //*** OMIT BC TAB NAV */
      .then(() => {
        console.log("user signed out");
      })
      .catch((error) => alert(error.message));
  };

  //ROUTES FOR MIDDLE TAB
  const FirstRoute = () => (
    <Center>
      <CurrentTripScreen trips={userCurrentTrips} />
    </Center>
  );
  const SecondRoute = () => (
    <Center>
      <PastTripsScreen trips={userCurrentTrips} />
    </Center>
  );
  const initialLayout = {
    width: Dimensions.get("window").width,
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  //MIDDLE TAB
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Current Trips",
    },
    {
      key: "second",
      title: "Past Trips",
    },
  ]);

  const renderTabBar = (props) => {
    // console.log(`Line 97 Home screen: `, props.navigationState.routes);
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "#999DC3"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box key={i} borderColor={borderColor} style={styles.tabBar}>
              <Pressable
                onPress={() => {
                  //console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <Stack style={styles.container} safeArea>
        <Box style={styles.headbox}>
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
          <Text style={styles.header} size="xl">
            {userInfo.name}'s Trip Dashboard
          </Text>
          {showPendingTrips !== 0 && <NewTripInviteMsg />}
        </Box>
      </Stack>

      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          marginTop: StatusBar.currentHeight,
        }}
      />
      <Center>
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center>
            <Button
              style={styles.button}
              _text={styles.buttonText}
              size="lg"
              onPress={() => navigation.navigate("New Trip")}
            >
              Add a Trip
            </Button>
          </Center>
        </Stack>
      </Center>
    </>
  );
};
export default HomeScreen;
