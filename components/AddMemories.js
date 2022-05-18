import { StyleSheet, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Stack,
  FormControl,
  Input,
  Box,
  Divider,
  WarningOutlineIcon,
  Heading,
  Text,
  Button,
  DatePicker,
  Center,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addTrip, fetchTrips } from "./store/trip";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import InviteTripMember from "./InviteTripMember";
import { addMemories } from "./store/memories";
//photos
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
//audio
import { Audio } from "expo-av";

const AddMemories = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log("PARAMS, ADDMEM", props.route.params.tripId);
  const tripId = props.route.params.tripId;
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);

  const [journalName, setJournalName] = useState("");
  const [location, setLocation] = useState("");
  const [journalDate, setJournalDate] = useState("");
  const [journal, setJournal] = useState("");

  //photo
  const [image, setImage] = useState(null);
  const [imageInfo, setimageInfo] = useState(null);
  //voice
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [voiceInfo, setVoiceInfo] = useState(null);

  const journalEntry = useSelector((state) => state.journalEntry);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    console.log("Photo", result.uri);
    if (!result.cancelled) {
      setImage(result.uri);
    }
    const storage = getStorage();
    if (result) {
      const imageName = uuidv4();
      const path = `photo/${tripId}/${imageName}`;
      setimageInfo(path);
      const ref_con = ref(storage, path); //how image will be addressed inside storage
      //convert images to bytes
      const photo = await fetch(result.uri);
      console.log("Photo", result.uri);
      const bytes = await photo.blob();
      console.log("BYTES", bytes);

      await uploadBytes(ref_con, bytes); //upload image
    }
  };

  //VOICE RECORDING

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
    audioUpload();
    // console.log("updatedRecordings", updatedRecordings);
    setRecordings(updatedRecordings);
  }

  const audioUpload = async () => {
    const recNum = recordings.length;
    const storage = getStorage(); //the storage itself
    if (recording) {
      console.log("recording", recording);
      const path = `audio/${tripId}/${recNum + 1}`;
      const ref_con = ref(storage, path);
      setVoiceInfo(path);
      const voiceFile = await fetch(recording._uri);
      console.log("Voice", voiceFile);
      const bytes = await voiceFile.blob();

      await uploadBytes(ref_con, bytes);
    }
  };

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
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
          {/* <Button
            style={styles.button}
            onPress={() => {
              recordingLine.sound.unloadAsync();
              recordings.splice(index, 1);
              setRecordings(recordings);
            }}
          >
            Delete
          </Button> */}
        </View>
      );
    });
  }

  const handleSubmit = () => {
    const newJournalEntry = {
      journalName,
      location,
      journalDate,
      journal,
      photo: imageInfo,
      voice: voiceInfo,
    };
    console.log(`post memories! clicked:`, newJournalEntry);
    console.log(`post memories! clicked: tripId passed in `, tripId);

    dispatch(addMemories(newJournalEntry, tripId));
    setJournalName("");
    setLocation("");
    setJournalDate("");
    setJournal("");
    navigation.goBack();
  };

  return (
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box alignItems="center">
          <Heading size="2xl" mb="4">
            Post Your Memories
          </Heading>
          <Text alignItems="center" fontSize="xs">
            Add special, funny, memorable moments from your trip!
          </Text>
        </Box>
        <Box>
          <Divider mb="8" />
          <FormControl mb="4">
            <FormControl.Label>Journal Name</FormControl.Label>
            <Input
              value={journalName}
              size="md"
              placeholder="Make it fun!"
              onChangeText={(text) => setJournalName(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Location</FormControl.Label>
            <Input
              value={location}
              size="md"
              placeholder="Enter the destination"
              onChangeText={(text) => setLocation(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Date</FormControl.Label>
            <Input
              value={journalDate}
              size="md"
              placeholder="Enter the date of the moment"
              onChangeText={(text) => setJournalDate(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Journal</FormControl.Label>
            <Input
              value={journal}
              size="lg"
              placeholder="Describe your memorable moment from this trip!"
              onChangeText={(text) => setJournal(text)}
            />
          </FormControl>
        </Box>
        <Box alignItems="flex-start" mb="6">
          <Center>
            <Text>{message}</Text>
            <Button onPress={recording ? stopRecording : startRecording}>
              {recording ? "Stop Recording" : "Start Recording"}
            </Button>
            {getRecordingLines()}
          </Center>
        </Box>
        <Button alignItems="flex-end" size="md" m="2.5" onPress={pickImage}>
          Upload Image
        </Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Box alignItems="center" mb="6">
          <Button size="lg" onPress={handleSubmit}>
            Post your memories!
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default AddMemories;

const styles = StyleSheet.create({});
