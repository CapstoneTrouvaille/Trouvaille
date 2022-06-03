import { Dimensions, StatusBar, Animated, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import trip from "../../store/trip";
import { useNavigation } from "@react-navigation/core";
import {
  Stack,
  Box,
  Text,
  Button,
  Center,
  useColorModeValue,
} from "native-base";
import { TabView, SceneMap } from "react-native-tab-view";
import Itinerary from "./Itinerary";
import Memories from "../memories/Memories";
import firebase from "firebase/compat";
import styles from "../../../styles/singleTrip";
import { fetchTripMembers } from "../../store/trip";
import { Ionicons } from "@expo/vector-icons";
import { convertFiretimeToString } from "../../helperFunctions/dates";

const SingleTrip = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const tripInfo = useSelector((state) => state.trip);
  const travelers = tripInfo.users || [];

  useEffect(() => {
    dispatch(fetchTripMembers(travelers));
  }, []);

  const tripMembers = useSelector((state) => state.trip.tripMembers);

  const startDate = tripInfo.startDate || "";
  const newStartDate = convertFiretimeToString(startDate);

  const endDate = tripInfo.endDate || "";
  const newEndDate = convertFiretimeToString(endDate);

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
              ? "#999DC3"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box key={i} style={styles.tabBar} borderColor={borderColor}>
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
      <Stack safeArea style={styles.container}>
        <Box>
          <Center>
            <Text style={styles.header}>{tripInfo.tripName}</Text>
            <Box style={styles.box}>
              <Text style={styles.tripInfo}>Location: {tripInfo.location}</Text>
              <Text style={styles.tripInfo}>
                {newStartDate} - {newEndDate}
              </Text>
              <Text style={styles.tripInfo}>
                Travelers: {tripMembers && tripMembers.toString()}
              </Text>
            </Box>
            <Box style={styles.buttons}>
              <Button
                style={styles.button}
                _text={styles.buttonText}
                size="sm"
                onPress={() =>
                  navigation.navigate("Send Invitations", {
                    tripId,
                    trip: tripInfo,
                  })
                }
              >
                Invite Trip Members
              </Button>
              <Button
                size="sm"
                style={styles.deleteButton}
                _text={styles.buttonText}
                colorScheme="gray"
              >
                <Ionicons name="trash-outline" size={17} color="white" />
              </Button>
            </Box>
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
