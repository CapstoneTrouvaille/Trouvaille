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

const Memories = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = props.tripId;
  const memories = useSelector((state) => state.memories);

  useEffect(() => {
    dispatch(fetchMemories(tripId));
  }, []);

  return (
    <ScrollView w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="0"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Center>
          <Button
            size="lg"
            mb="6"
            onPress={() =>
              navigation.navigate("AddMemories", {
                tripId: tripId,
              })
            }
          >
            Add a memory
          </Button>
        </Center>

        <Box>
          <Heading fontSize="xl" p="4" pb="3">
            Memories
          </Heading>

          {memories.map((memory) => (
            <SingleMemory memory={memory} />
          ))}
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default Memories;

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
