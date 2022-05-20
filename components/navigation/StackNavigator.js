import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { firebase, auth } from "../../firebase";

//screens
import HomeScreen from "../HomeScreen";
import AddTrip from "../AddTrip";

import ChatScreen from "../ChatScreen";
import ExploreScreen from "../ExploreScreen";
import InviteTripMember from "../InviteTripMember";
import NewTripInviteMsg from "../NewTripInviteMsg";
import InviteAcceptDecline from "../InviteAcceptDecline";
import PlacesResults from "../PlacesResults";
import SingleTrip from "../SingleTrip";
import Memories from "../Memories";
import AddMemories from "../AddMemories";
import ImageUpload from "../ImageUpload";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerRight: () => (
          <Ionicons
            name="exit-outline"
            size={30}
            color="#999DC3"
            onPress={() => firebase.auth().signOut()}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="New Trip" component={AddTrip} />
      <Stack.Screen name="Send Invitations" component={InviteTripMember} />
      <Stack.Screen name="Invitations" component={InviteAcceptDecline} />
      <Stack.Screen name="New Trip Invite" component={NewTripInviteMsg} />
      <Stack.Screen name="Trip" component={SingleTrip} />
      <Stack.Screen name="Memories" component={Memories} />
      <Stack.Screen name="Add Memories" component={AddMemories} />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
    </Stack.Navigator>
  );
};

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerRight: () => (
          <Ionicons
            name="exit-outline"
            size={30}
            color="#999DC3"
            onPress={() => firebase.auth().signOut()}
          />
        ),
      }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerRight: () => (
          <Ionicons
            name="exit-outline"
            size={30}
            color="#999DC3"
            onPress={() => firebase.auth().signOut()}
          />
        ),
      }}
    >
      <Stack.Screen name="Explore" component={ExploreScreen} />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator, ChatStackNavigator, ExploreStackNavigator };
