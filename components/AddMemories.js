import { View, Image } from "react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Stack,
  FormControl,
  Input,
  Box,
  Divider,
  Heading,
  Text,
  Button,
  Center,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { addMemories } from "./store/memories";
import DatePicker from "react-native-datepicker";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/addMemories";
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
  const tripId = props.route.params.tripId;
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    const storage = getStorage();
    if (result) {
      const imageName = uuidv4();
      const path = `photo/${tripId}/${imageName}`;
      setimageInfo(path);
      const ref_con = ref(storage, path);
      const photo = await fetch(result.uri);
      const bytes = await photo.blob();
      await uploadBytes(ref_con, bytes);
    }
  };

  //VOICE RECORDING
  const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
    isMeteringEnabled: true,
    android: {
      extension: ".m4a",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".m4a",
      outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          RECORDING_OPTIONS_PRESET_HIGH_QUALITY
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
  }

  const audioUpload = async () => {
    const storage = getStorage();
    if (recording) {
      const voiceName = uuidv4();
      const path = `audio/${tripId}/${voiceName}`;
      const ref_con = ref(storage, path);
      setVoiceInfo(path);
      const voiceFile = await fetch(recording._uri);
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
            size="xs"
            variant="outline"
            colorScheme="indigo"
            style={styles.playButton}
            onPress={() => recordingLine.sound.replayAsync()}
          >
            <Ionicons name="play" size={15} color="#999DC3" />
          </Button>
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
      photo: imageInfo || null,
      voice: voiceInfo || null,
    };

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
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Box alignItems="center">
          <Text style={styles.heading}>Post Your Memories</Text>
          <Text style={styles.subtitle}>
            Add special, funny, memorable moments from your trip!
          </Text>
        </Box>

        <View style={styles.container}>
          <Text style={styles.text}>Journal Date</Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={journalDate}
            mode="date"
            placeholder="select start date"
            format="MM/DD/YYYY"
            minDate="01-01-2022"
            maxDate="01-01-3022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor: "gray",
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              placeholderText: {
                fontSize: 17,
                color: "gray",
              },
              dateText: {
                fontSize: 17,

                fontFamily: "Jaldi_400Regular",
              },
            }}
            onDateChange={(date) => {
              setJournalDate(date);
            }}
          />
        </View>

        <Box>
          <Divider mb="8" />
          <FormControl mb="4">
            <FormControl.Label _text={styles.text}>
              Journal Name
            </FormControl.Label>
            <Input
              value={journalName}
              size="md"
              style={styles.text}
              placeholder="Make it fun!"
              onChangeText={(text) => setJournalName(text)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormControl.Label>Location</FormControl.Label>
            <Input
              value={location}
              size="md"
              style={styles.text}
              placeholder="Enter the destination"
              onChangeText={(text) => setLocation(text)}
            />
          </FormControl>

          <FormControl mb="4">
            <FormControl.Label>Journal Entry</FormControl.Label>
            <Input
              value={journal}
              size="md"
              style={styles.text}
              placeholder="Describe your memorable moment from this trip!"
              onChangeText={(text) => setJournal(text)}
            />
          </FormControl>
        </Box>
        <Box style={styles.recordUploadContainer}>
          <Text>{message}</Text>
          <Button
            size="sm"
            style={styles.buttons}
            onPress={recording ? stopRecording : startRecording}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button size="sm" style={styles.buttons} onPress={pickImage}>
            Upload Image
          </Button>
        </Box>
        <Center>
          {getRecordingLines()}
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </Center>
        <Box alignItems="center" mb="6">
          <Button size="sm" style={styles.buttons} onPress={handleSubmit}>
            Post!
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default AddMemories;
