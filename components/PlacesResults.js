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
  NativeBaseProvider,
  Link,
} from "native-base";

{
  /* <Text key={index}>{place.name}</Text> */
}
const PlacesResults = () => {
  const placesList = useSelector((state) => state.places) || [null];
  const placesArr = [placesList[0]]
  console.log("placeslist", placesList);
  return (
    <Box alignItems="center">
      {placesList.map((place, index) => (

        <Box
          key = {index}
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
                  uri: place.photo ? place.photo.images.medium.url : "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
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
              PHOTOS
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {place.name}
              </Heading>
            </Stack>
            <Text fontWeight="400">{place.ranking}</Text>
            <Text numberOfLines={4} fontWeight="400">{place.description}</Text>
            <Link
                href= {place.web_url}
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

export default PlacesResults;

const styles = StyleSheet.create({});
