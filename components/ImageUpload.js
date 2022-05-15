import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  TouchableHighlight,
  Platform,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "./helperFunctions/upload";
//NEED FIREBASE AUTH STILL??****
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageUpload = () => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <TouchableHighlight onPress={pickImage}>
        <Text>Select Image</Text>
      </TouchableHighlight> */}
      <View styles={styles.button}>
        <Button title="Pick Image" onPress={pickImage} />
      </View>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    height: 150,
  },
  button: {
    margin: 8,
  },
});
