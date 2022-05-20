import React, { useRef, useState } from "react";

import { db, auth, firestore, firebase } from "../firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";

import { View, StyleSheet } from "react-native";
import {
  FormControl,
  Input,
  Button,
  Stack,
  ScrollView,
  Image,
  Avatar,
  Text,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import user from "./store/user";

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
  const userName = useSelector((state) => state.user);
  const name = userName.name;

  const sendMessage = async (e) => {
    // console.log("working???", e);
    const { uid, photoURL } = auth.currentUser;
    // console.log("current user in sendmessage", uid);
    // console.log("TIMESTAMP", firestore.Timestamp);
    // console.log(auth.currentUser);

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      uid,
      photoURL,
      name,
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
          style={styles.input}
        />

        <Button
          type="submit"
          disabled={!formValue}
          onPress={sendMessage}
          style={styles.button}
        >
          💌
        </Button>
      </FormControl>
    </Stack>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, name } = props.message;
  // console.log("chatMessage", props.message);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  console.log("messageClass", messageClass);
  return (
    <>
      <View
        className={`message ${messageClass}`}
        style={messageClass === "sent" ? styles.sent : styles.received}
      >
        <View>
          <Avatar
            bg="purple.600"
            alignSelf="flex-start"
            size="md"
            source={{
              uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            }}
          ></Avatar>
          <Text bold>{name}</Text>
        </View>

        <View>
          <Text>{text}</Text>
        </View>
      </View>
    </>
  );
}

export default ChatScreen;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  sent: {
    flexDirection: "row-reverse",
    color: "blue",
    backgroundColor: "#FFF5AB",
    alignSelf: "flex-end",
    borderRadius: 25,
    padding: 10,
  },
  received: {
    flexDirection: "row",
    color: "red",
    backgroundColor: "#FFBCD1",
    alignSelf: "flex-start",
    borderRadius: 25,
    padding: 10,
  },
  button: {
    backgroundColor: "#999DC3",
  },
  input: {
    borderColor: "#999DC3",
  },
});
