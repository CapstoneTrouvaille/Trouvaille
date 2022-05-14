import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Heart = () => {
  const [saved, setSaved] = useState(false);
  const toggleHeart = () => setSaved(!saved);

  return (
    <TouchableOpacity onPress={toggleHeart}>
      <Ionicons
        name={saved ? "heart" : "heart-outline"}
        size={25}
        color="red"
      />q
    </TouchableOpacity>
  );
};

export default Heart;

const styles = StyleSheet.create({});
