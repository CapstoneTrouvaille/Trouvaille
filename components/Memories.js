import { StyleSheet, View } from "react-native";
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
import Voice from "./Voice";
import ImageUpload from "./ImageUpload";
import SingleMemory from "./SingleMemory";


const Memories = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tripId = props.tripId;
  console.log("PARAMS IN MEM", props);
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
                tripId: props.tripId,
              })
            }
          >
            Add a memory
          </Button>
        </Center>
        <Center>
          <Voice />
          Memories
        </Center>
        <Box alignItems="center" mb="6">
          <Button size="lg" onPress={() => navigation.navigate("ImageUpload")}>
            Upload Image
          </Button>
        </Box>

        <Divider mv="8" />

        <Box>
          <Heading fontSize="xl" p="4" pb="3">
            Memories
          </Heading>
          <FlatList
            data={memories}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3} justifyContent="space-between">
                  <VStack>
                    <SingleMemory memory={item} />
                  </VStack>
                  <Spacer />
                  <Text fontSize="xs" alignSelf="flex-start">
                    {item.journalDate}
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
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
