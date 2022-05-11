import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native"; //rnfes
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/user";
import { fetchTrips } from "./store/trip";
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
  NativeBaseProvider,
  useColorModeValue,
  Center,
} from "native-base";
import { TabView, SceneMap } from "react-native-tab-view";
import CurrentTripScreen from "./CurrentTripScreen";
import PastTripsScreen from "./PastTripsScreen";

//ROUTES FOR MIDDLE TAB
const FirstRoute = () => (
  <Center>
    <CurrentTripScreen />
  </Center>
);
const SecondRoute = () => (
  <Center>
    <PastTripsScreen />
  </Center>
);
const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

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
    console.log(props.navigationState.routes);
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
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable
                onPress={() => {
                  console.log(i);
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
              size="lg"
              mb="6"
              onPress={() => navigation.navigate("AddTrip")}
            >
              Add a Trip
            </Button>
          </Center>
          <Center>
            <Button
              size="lg"
              mb="6"
              onPress={() => navigation.navigate("InviteFriends")}
            >
              Invite Friends
            </Button>
          </Center>
          <Center>
            <Button size="lg" mb="6" onPress={handleSignOut}>
              Sign Out
            </Button>
          </Center>
        </Stack>
      </Center>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
