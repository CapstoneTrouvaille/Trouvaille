import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Box, Button, ScrollView,Center, Divider } from "native-base";
import { inMemoryPersistence } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/memories";

const SingleMemory = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const memory = props.memory || "";
  const [url, setUrl] = useState();
  const [voice, setVoice] = useState();
  const [playing, setPlaying] = useState();

  useEffect(() => {});
  //PHOTO
  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const reference = ref(storage, `/${memory.photo}`);
      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    };
    func();
  }, []);
  //VOICE

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const reference = ref(storage, `/${memory.voice}`);
      await getDownloadURL(reference).then((x) => {
        setVoice(x);
      });
    };
    func();
  }, []);

  async function playSound() {
    try {
      await new Audio.Sound.createAsync({ uri: voice }, { shouldPlay: true });
    } catch (error) {
      console.log("voice replaying error", error);
    }
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View>
      <Button
        size="sm"
        variant="outline"
        style={styles.memoryButton}
        _text={styles.buttonText}
        colorScheme="indigo"
        onPress={handleClick}
      >
        {memory.journalName}
      </Button>

      {isClicked ? (
        <Center>
          {url && (
            <Image source={{ uri: url }} style={{ width: "100%", height: 300 }} />
          )}

          {voice && (
            <Box style={styles.headerBox}>
              <Button
                size="xs"
                variant="outline"
                colorScheme="indigo"
                style={styles.voiceButton}
                _text={styles.buttonText}
                onPress={playSound}
              >
                <Ionicons name="play" size={15} color="#999DC3"/>
              </Button>
              <Button
                size="xs"
                variant="outline"
                colorScheme="indigo"
                style={styles.voiceButton}
                _text={styles.buttonText}
              >
                 <Ionicons name="pause" size={15} color="#999DC3"/>
              </Button>
            </Box>
          )}
          <Text>{memory.journal}</Text>
          <Divider mb="2" />
          <Button
            size="xs"
            style={styles.deleteButton}
            _text={styles.buttonText}
            colorScheme="gray"
          >
            Delete
          </Button>
        </Center>
      ) : null}
    </View>
  );
};

export default SingleMemory;
