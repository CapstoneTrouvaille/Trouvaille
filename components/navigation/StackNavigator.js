import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import HomeScreen from "../HomeScreen";
import AddTrip from "../AddTrip";
import ProfileScreen from "../ProfileScreen";
import ChatScreen from "../ChatScreen";
import ExploreScreen from "../ExploreScreen";
import InviteTripMember from "../InviteTripMember";
import PlacesResults from "../PlacesResults";
import SingleTrip from "../SingleTrip";
import Memories from "../Memories";
import AddMemories from "../AddMemories";
import ImageUpload from "../ImageUpload";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackVisible: true }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddTrip" component={AddTrip} />
      <Stack.Screen name="InviteFriends" component={InviteTripMember} />
      <Stack.Screen name="SingleTrip" component={SingleTrip} />
      <Stack.Screen name="Memories" component={Memories} />
      <Stack.Screen name="AddMemories" component={AddMemories} />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackVisible: true }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackVisible: true }}>
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackVisible: true, headerShown: false }}
    >
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Places" component={PlacesResults} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ProfileStackNavigator,
  ChatStackNavigator,
  ExploreStackNavigator,
};
