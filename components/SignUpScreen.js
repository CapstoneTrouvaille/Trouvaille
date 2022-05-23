import {
  View,
  Stack,
  FormControl,
  Input,
  Icon,
  Box,
  Divider,
  WarningOutlineIcon,
  Heading,
  Text,
  Button,
  Center,
  VStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { signupUser } from "./store/user";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/signup";

const image = require("../assets/trouvaillehomeback.png");

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <View w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Center>
          <Box alignItems="center">
            <Heading style={styles.header} size="xl" mb="4">
              Create Account
            </Heading>
          </Box>
          <Divider mb="8" />
          <Box>
            <FormControl mt="20" mb="4">
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                w={{
                  base: "80%",
                  md: "25%",
                }}
                size="lg"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Name"
              />
            </FormControl>

            <FormControl mb="4">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                w={{
                  base: "80%",
                  md: "25%",
                }}
                size="lg"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="email" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
              />
            </FormControl>

            <FormControl mb="4">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                w={{
                  base: "80%",
                  md: "25%",
                }}
                size="lg"
                type={show ? "text" : "password"}
                InputRightElement={
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                    onPress={() => setShow(!show)}
                  />
                }
                value={password}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
              />
            </FormControl>
          </Box>
        </Center>
        <VStack space={6} alignItems="center">
          <Button
            style={styles.button}
            _text={styles.buttonText}
            size="md"
            onPress={() => {
              if (name != "") {
                dispatch(signupUser(name, email, password));
              } else {
                alert("Please fill everything out to register!");
              }
            }}
          >
            Sign Up
          </Button>
          <Button
            style={styles.button}
            _text={styles.buttonText}
            size="md"
            onPress={() => navigation.navigate("Login")}
          >
            Cancel
          </Button>
        </VStack>
      </Stack>
    </View>
  );
};

export default SignUpScreen;
