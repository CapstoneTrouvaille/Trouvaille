import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Center,
  HStack,
  Stack,
  Link,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Heart from "./Heart";

const FoodResults = () => {
  const foodList = useSelector((state) => state.food) || [null];

  return (
    <Box alignItems="center">
      {foodList.map((food, index) => (
        <Box
          key={index}
          w="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="12"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: food.photo
                    ? food.photo.images.large.url
                    : "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: "violet.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              {food.price_level}
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2} direction="row" justifyContent="space-between">
              <Heading size="md" ml="-1">
                {food.name}
              </Heading>
              <Heart name={food.name}/>
            </Stack>
            <Text fontWeight="400">
              <Ionicons name="star" size={17} color="orange" />
              {food.rating}
            </Text>
            <Text fontWeight="400">{food.ranking}</Text>
            <Text>
              {food.cuisine
                ? food.cuisine.map((type) => type.name).join(", ")
                : ""}
            </Text>
            <Text numberOfLines={4} fontWeight="400">
              {food.description}
            </Text>
            <Link
              w="23%"
              href={food.web_url}
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              More Details
            </Link>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            ></HStack>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default FoodResults;

const styles = StyleSheet.create({});
