import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { firebase, auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store";

//screens
import HomeScreen from "../screens/trip/HomeScreen";
import AddTrip from "../screens/trip/AddTrip";
import ChatScreen from "../screens/chat/ChatScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";
import InviteTripMember from "../screens/invite/InviteTripMember";
import NewTripInviteMsg from "../screens/invite/NewTripInviteMsg";
import InviteAcceptDecline from "../screens/invite/InviteAcceptDecline";
import SingleTrip from "../screens/trip/SingleTrip";
import Memories from "../screens/memories/Memories";
import AddMemories from "../screens/memories/AddMemories";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerRight: () => (
          <Ionicons
            name="exit-outline"
            size={30}
            color="#999DC3"
            onPress={() => {
              firebase.auth().signOut();
              dispatch(logoutUser());
            }}
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
