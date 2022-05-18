import { StyleSheet, View, Image} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Box, Button  } from "native-base";
import { inMemoryPersistence } from "firebase/auth";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Audio } from "expo-av";

const SingleMemory = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const memory = props.memory || ""
  const [url, setUrl] = useState();
  const [voice, setVoice] = useState();


  useEffect(()=> {

  })
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
      console.log("VOICE", voice);
      const { sound } = await Audio.Sound.createAsync({ uri: voice });
      await sound.playAsync();
      await sound.unloadAsync();
    } catch (error) {
      console.log("voice replaying error", error);
    }
  }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View mb="2%" >
      <Button size ="sm" variant="outline" onPress={handleClick} bold>
        {memory.journalName}
      </Button>

      {isClicked ? (
        <>
          <Text>{memory.journal}</Text>

          {url && (
            <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
          )}

          {voice && <Button title="Play Sound" onPress={playSound} />}
        </>
      ) : null}
    </View>
  );
};

export default SingleMemory;

const styles = StyleSheet.create({});
