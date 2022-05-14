import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";


const SingleMemory = (props) => {
  console.log("PROPS", props);
  const [isClicked, setIsClicked] = useState(false)
  const memory = props.memory || "";


  const handleClick=()=>{
    setIsClicked(!isClicked)
  }

  return (
    <View>
      <Text
        onPress={handleClick}
        _dark={{
          color: "warmGray.50",
        }}
        color="coolGray.800"
        bold
      >
        {memory.journalName}
      </Text>

      {isClicked ? <Text>{memory.journal}</Text> : null}

    </View>
  );
};

export default SingleMemory;

const styles = StyleSheet.create({});
