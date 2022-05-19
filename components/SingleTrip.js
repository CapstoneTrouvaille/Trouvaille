import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTrip } from "./store/trip";
import { useNavigation } from "@react-navigation/core";
import {
  ScrollView,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  Center,
  useColorModeValue,
} from "native-base";
import { TabView, SceneMap } from "react-native-tab-view";
import Itinerary from "./Itinerary";
import Memories from "./Memories";
import firebase from "firebase/compat";
import { fetchTripMember } from "./store/trip";

const SingleTrip = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const trip = useSelector((state) => state.trip);
  const tripInfo = route.params.trip;
  console.log("tripinfo? ", route.params.trip);

  console.log("tripMembers?", trip.tripMembers);
  const getTravelers = tripInfo.users;
  const travelers = trip.tripMembers;

  useEffect(() => {
    dispatch(fetchTripMember(getTravelers));
  }, []);

  //may need to delete?
  const startDate = tripInfo.startDate || "";
  const fireBaseTime = new Date(
    startDate.seconds * 1000 + startDate.nanoseconds / 1000000
  );
  const newStartDate = fireBaseTime.toDateString();

  const endDate = tripInfo.endDate || "";
  const eFireBaseTime = new Date(
    endDate.seconds * 1000 + endDate.nanoseconds / 1000000
  );
  const newEndDate = eFireBaseTime.toDateString();

  const FirstRoute = () => (
    <Center>
      <Itinerary tripId={tripId} />
    </Center>
  );
  const SecondRoute = () => (
    <Center>
      <Memories tripId={tripId} />
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
      title: "Itinerary",
    },
    {
      key: "second",
      title: "Memories",
    },
  ]);

  const renderTabBar = (props) => {
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
              key={i}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable
                onPress={() => {
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
      <View>
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="0"
          w={{
            base: "100%",
            md: "25%",
          }}
        >
          <Box>
            <Center>
              <Stack space={2}>
                <Heading fontSize="xl" p="4" pb="3">
                  {tripInfo.tripName}
                </Heading>
              </Stack>
              <Text fontWeight="400">Location: {tripInfo.location}</Text>
              <Text fontWeight="400">
                {newStartDate} - {newEndDate}
              </Text>
              <Text fontWeight="400">
                Travelers: {travelers && travelers.toString()}
              </Text>
              <Button
                size="md"
                mt="4"
                mb="2"
                onPress={() =>
                  navigation.navigate("InviteTripMember", {
                    tripId,
                  })
                }
              >
                Invite Trip Members
              </Button>
            </Center>
          </Box>
        </Stack>
      </View>
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
    </>
  );
};

export default SingleTrip;

const styles = StyleSheet.create({});
