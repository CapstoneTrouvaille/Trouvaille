import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import {
  NativeBaseProvider,
  Box,
  Text,
  Center,
  useColorModeValue,
  Container,
  Avatar
} from "native-base";
import React from "react";
import CurrentTripScreen from "./CurrentTripScreen";
import PastTripsScreen from "./PastTripsScreen";

// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import CurrentTripScreen from "./CurrentTripScreen";
// import PastTripsScreen from "./PastTripsScreen";

// const TopTab = createMaterialTopTabNavigator();

const FirstRoute = () => <Center> <CurrentTripScreen /></Center>;
const SecondRoute = () => <Center><PastTripsScreen/></Center>;
const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});


const ProfileScreen = () => {
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
    console.log(props.navigationState.routes)
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
    <Box>
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
    </Box>
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

// const ProfileScreen = () => {
//   return (
//     // <>
//     //   <View>
//     //     <Text>SOMETHING HERE</Text>
//     //   </View>
//     //   <TopTab.Navigator>
//     //     <TopTab.Screen name="Current" component={CurrentTripScreen} />
//     //     <TopTab.Screen name="Past" component={PastTripsScreen} />
//     //   </TopTab.Navigator>
//     // </>
//   );
// };

export default ProfileScreen;

const styles = StyleSheet.create({});
