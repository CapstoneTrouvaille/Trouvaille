import React, { useEffect } from "react";
import { StyleSheet, View, Platform, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "./helperFunctions/upload";

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
