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
import trip, { fetchSingleTrip } from "./store/trip";
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
import styles from "../styles/singleTrip";
import { fetchTripMember } from "./store/trip";

const SingleTrip = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const tripInfo = route.params.trip;
  const travelers = tripInfo.users || [];

  useEffect(() => {
    dispatch(fetchTripMember(travelers));
  }, []);

  const tripMembers = useSelector((state) => state.trip.tripMembers);

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

  //console.log("DDDAAATTEEEEEEEEEE", tripInfo.startDate);

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
              ? "#999DC3"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box key={i} style={styles.tabBar} borderColor={borderColor}>
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
      <Stack safeArea style={styles.container}>
        <Box>
          <Center>
            <Text style={styles.header}>{tripInfo.tripName}</Text>
            <Text style={styles.tripInfo}>Location: {tripInfo.location}</Text>
            <Text style={styles.tripInfo}>
              {newStartDate} - {newEndDate}
              {/* {JSON.stringify(tripInfo.startDate.toDate()).replace(
                  /['"]+/g,
                  ""
                )}{" "}
                -{" "}
                {JSON.stringify(tripInfo.endDate.toDate()).replace(
                  /['"]+/g,
                  ""
                )} */}
            </Text>
            <Text style={styles.tripInfo}>
              Travelers: {tripMembers && tripMembers.toString()}
            </Text>
            <Button
              style={styles.button}
              _text={styles.buttonText}
              size="md"
              onPress={() =>
                navigation.navigate("Send Invitations", {
                  tripId,
                  trip: tripInfo,
                })
              }
            >
              Invite Trip Members
            </Button>
          </Center>
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
    </>
  );
};

export default SingleTrip;
