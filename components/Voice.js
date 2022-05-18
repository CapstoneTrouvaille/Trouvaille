import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Center, Text, Button } from "native-base";
import { Audio } from "expo-av";
import { auth, firebase, db } from "../firebase";
import "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const Voice = (props) => {
  // Voice Memo
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  const tripInfo = useSelector((state) => state.trip);
  // console.log("tripInfo in Voice", tripInfo);
  // console.log("tripIdin Voice", props);
  const tripId = props.tripId;

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (error) {
      console.log("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    audioUpload(recording.getURI());
    // console.log("updatedRecordings", updatedRecordings);
    setRecordings(updatedRecordings);
  }

  const audioUpload = async () => {
    const recNum = recordings.length;
    const storage = getStorage(); //the storage itself
    if (recording) {
      const path = `audio/${tripId}/${recNum + 1}.mp3`;
      const ref_con = ref(storage, path); //how image will be addressed inside storage
      //convert images to bytes
      const voiceFile = await fetch(recording.file);
      console.log("Voice", voiceFile);
      const bytes = await voiceFile.blob();

      await uploadBytes(ref_con, bytes); //upload image
    }
  };
  // return new Promise(async (res, rej) => {
  //   const storage = getStorage();
  //   const response = await fetch(uri);
  //   const file = await response.blob();
  //   const path = `audio/${tripId}/${Date.now()}.mp3`;
  //   const upload = ref(storage, path).put(file);
  //   //   let upload = storage.ref(path).;
  //   upload.on(
  //     "state_changed",
  //     (snapshot) => {
  //       console.log("Audio is uploading...");
  //     },
  //     (err) => {
  //       rej(err);
  //     },
  //     async () => {
  //       const url = await upload.snapshot.ref.getDownloadURL();
  //       res(url);
  //     }
  //   );

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    // console.log("recordings", recordings);
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            style={styles.button}
            onPress={() => recordingLine.sound.replayAsync()}
          >
            Play
          </Button>
          <Button
            style={styles.button}
            onPress={() => {
              recordingLine.sound.unloadAsync();
              recordings.splice(index, 1);
              setRecordings(recordings);
            }}
          >
            Delete
          </Button>
        </View>
      );
    });
  }

  return (
    <Center>
      <Text>{message}</Text>
      <Button onPress={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </Button>
      {getRecordingLines()}
    </Center>
  );
};

export default Voice;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});
