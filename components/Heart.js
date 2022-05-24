import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveItem } from "./store/saved";

const Heart = (props) => {
  const dispatch = useDispatch();
  const [saveStatus, setSaveStatus] = useState(false);

  const toggleHeart = () => {
    setSaveStatus(!saveStatus);
    dispatch(saveItem(props.name, !saveStatus));
  };

  return (
    <TouchableOpacity onPress={toggleHeart}>
      <Ionicons
        name={saveStatus ? "heart" : "heart-outline"}
        size={25}
        color="red"
      />
    </TouchableOpacity>
  );
};

export default Heart;
