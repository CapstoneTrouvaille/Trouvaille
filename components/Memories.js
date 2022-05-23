import { StyleSheet, View, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemories } from "./store/memories";
import {
  ScrollView,
  Stack,
  FormControl,
  Input,
  Box,
  Divider,
  Spacer,
  Heading,
  Text,
  Button,
  Avatar,
  FlatList,
  VStack,
  HStack,
  Center,
} from "native-base";

import { useNavigation } from "@react-navigation/core";
import { db } from "../firebase";
import SingleMemory from "./SingleMemory";

import styles from "../styles/memories";

const Memories = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = props.tripId;
  const memories = useSelector((state) => state.memories);

  useEffect(() => {
    dispatch(fetchMemories(tripId));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView w="100%">
        <Box>
          <Box style={styles.headerBox}>
            <Text style={styles.header}>Memories</Text>
            <Button
              size="xs"
              style={styles.button}
              _text={styles.buttonText}
              onPress={() =>
                navigation.navigate("Add Memories", {
                  tripId: tripId,
                })
              }
            >
              Add a memory
            </Button>
          </Box>

          {memories.map((memory, index) => (
            <SingleMemory key={index} memory={memory} />
          ))}
        </Box>
      </ScrollView>
    </View>
  );
};

export default Memories;
