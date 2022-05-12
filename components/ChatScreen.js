import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ChatScreen = () => {
  const [user] = useAuthState(auth);

  const messagesRef = db.collection("trips");

  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
