import {
  StyleSheet,
  //Text, View
} from "react-native";
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
import React from "react";
import { useNavigation } from "@react-navigation/core";
import ImageUpload from "./ImageUpload";

const Memories = () => {
  const navigation = useNavigation();

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
        <Box>
          <Center>
            <Stack space={2}>
              <Heading fontSize="xl" p="4" pb="3">
                Memories
              </Heading>
            </Stack>
          </Center>
        </Box>
        <Box alignItems="center" mb="6">
          <Button size="lg" onPress={() => navigation.navigate("ImageUpload")}>
            Upload Image
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default Memories;

const styles = StyleSheet.create({});
