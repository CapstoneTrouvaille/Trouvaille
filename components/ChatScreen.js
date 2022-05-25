import React, { useRef, useState } from "react";
import { auth, firestore, firebase } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { View } from "react-native";
import {
  FormControl,
  Input,
  Button,
  Stack,
  ScrollView,
  Avatar,
  Text,
  Box,
} from "native-base";
import user from "./store/user";
import styles from "../styles/chatScreen";

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
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      uid,
      photoURL: userName.photoURL,
      name,
    });

    setFormValue("");
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack mb="18%">
        <ScrollView>
          {messages &&
            messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}

          <Text ref={dummy}></Text>
        </ScrollView>
      </Stack>
      <View style={styles.chatInput}>
        <FormControl>
          <Input
            value={formValue}
            onChangeText={(e) => setFormValue(e)}
            placeholder="share amazing trip ideas"
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
      </View>
    </View>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, name } = props.message;
  const userName = useSelector((state) => state.user);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <View
        className={`message ${messageClass}`}
        style={messageClass === "sent" ? styles.sent : styles.received}
      >
        <Box
          style={
            messageClass === "sent" ? styles.sentUser : styles.receivedUser
          }
        >
          <Avatar
            bg="purple.600"
            alignSelf="flex-start"
            size="md"
            style={styles.avatar}
            source={{
              uri: photoURL,
            }}
          ></Avatar>

          <Text bold> {name}</Text>
        </Box>

        <Box
          style={
            messageClass === "sent" ? styles.chatSent : styles.chatReceived
          }
        >
          <Text style={styles.chatText}>{text}</Text>
        </Box>
      </View>
    </>
  );
}

export default ChatScreen;
