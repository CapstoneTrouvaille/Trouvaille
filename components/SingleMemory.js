import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {Text} from "native-base"

const SingleMemory = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const memory = props.memory || "";

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View>
      <Text onPress={handleClick} bold>
        {memory.journalName}
      </Text>

      {isClicked ? <Text>{memory.journal}</Text> : null}
    </View>
  );
};

export default SingleMemory;

const styles = StyleSheet.create({});
