import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatScreen = () => {

  const userInfo = useSelector((state) => state.user);
  const [user] = useAuthState(auth);

  // console.log("user", user)
  // console.log("USERSTATE", userInfo)
  // const messagesRef = db.collection("trips");


  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
