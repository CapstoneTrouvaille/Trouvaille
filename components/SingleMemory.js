import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Box, Button, ScrollView } from "native-base";
import { inMemoryPersistence } from "firebase/auth";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

import { Ionicons } from "@expo/vector-icons";

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
    <ScrollView mb="2%">
      <Button size="sm" variant="outline" onPress={handleClick} bold>
        {memory.journalName}
      </Button>

      {isClicked ? (
        <>
          <Text>{memory.journal}</Text>

          {url && (
            <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
          )}

          {voice && (
            <Button onPress={playSound} title="play recording"></Button>
          )}
        </>
      ) : null}
    </ScrollView>
  );
};

export default SingleMemory;

const styles = StyleSheet.create({});
