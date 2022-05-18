import React, { useRef, useState } from "react";

import { db, auth, firestore, firebase } from "../firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { View, Text, StyleSheet } from "react-native";
import {
  FormControl,
  Input,
  Button,
  Stack,
  ScrollView,
  Image,
  Avatar,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

function ChatScreen() {
  const [user] = useAuthState(auth);

  return <ChatRoom />;
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    // console.log("working???", e);
    const { uid, photoURL } = auth.currentUser;
    console.log("current user in sendmessage", uid);
    console.log("TIMESTAMP", firestore.Timestamp);
    console.log(auth.currentUser);

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      uid,
      photoURL,
    });

    setFormValue("");
    // dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack mb="18%">
      <ScrollView>
        {messages &&
          messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}

        <Text ref={dummy}></Text>
      </ScrollView>
      <FormControl>
        <Input
          value={formValue}
          onChangeText={(e) => setFormValue(e)}
          placeholder="say something nice"
        />

        <Button type="submit" disabled={!formValue} onPress={sendMessage}>
          🕊️
        </Button>
      </FormControl>
    </Stack>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  console.log("chatMessage", props.message);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <View className={`message ${messageClass}`} style={styles.row}>
        <Avatar
          bg="purple.600"
          alignSelf="flex-start"
          size="md"
          source={{
            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
          }}
        ></Avatar>
        <Text>{text}</Text>
      </View>
    </>
  );
}

export default ChatScreen;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
