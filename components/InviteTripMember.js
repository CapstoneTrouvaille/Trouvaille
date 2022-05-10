import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
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

const InviteTripMember = () => {
  const trip = useSelector((state) => state.trip);

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Eric Cole",
      timeStamp: "12:47 PM",
      recentText: "Can't wait to see you all!",
      avatarUrl:
        "https://images.unsplash.com/photo-1447684808650-354ae64db5b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8MjEyNTI3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Yeji Mini",
      timeStamp: "11:11 PM",
      recentText: "Counting down the days!",
      avatarUrl:
        "https://images.unsplash.com/photo-1457914109735-ce8aba3b7a79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MjEyNTI3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Carli Jay",
      timeStamp: "6:22 PM",
      recentText: "What happens in abc stays in abc!",
      avatarUrl:
        "https://images.unsplash.com/photo-1446231855385-1d4b0f025248?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXwyMTI1Mjd8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
    },
  ];
  const [tripFriends, setTripFriends] = useState(data);

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
        <Box alignItems="center" bgColor="indigo.400">
          <Avatar
            bg="purple.600"
            alignSelf="center"
            size="xl"
            source={{
              uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            }}
          >
            RB
          </Avatar>
          <Text>Hi, Yourname</Text>
        </Box>
        <Divider mb="2" />
        <Box>
          <Center>
            <Heading fontSize="xl" p="4" pb="3">
              Cancun or Bust Friends
            </Heading>
          </Center>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.fullName}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.recentText}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {item.timeStamp}
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
        {/* <Box>
          <Center>
            <Text bold fontSize="xl" p="4" pb="3">
              Pending Invitations
            </Text>
          </Center>
        </Box> */}
      </Stack>
    </ScrollView>
  );
};

export default InviteTripMember;

const styles = StyleSheet.create({});
