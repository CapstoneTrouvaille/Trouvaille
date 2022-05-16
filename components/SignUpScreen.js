import {
  //   KeyboardAvoidingView,
  StyleSheet,
  //   Text,
  //   View,
  //   TextInput,
  //   TouchableOpacity,
  //   ImageBackground,
} from "react-native";
import {
  ScrollView,
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
} from "native-base";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { signupUser } from "./store/user";
import { MaterialIcons } from "@expo/vector-icons";

const image = require("../assets/trouvaillehomeback.png");

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <ScrollView w="100%">
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
        <Box alignItems="center">
          <Heading size="2xl" mb="4">
            Create Account
          </Heading>
        </Box>

        <Box>
          <Divider mb="8" />
          <FormControl mb="4">
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
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
            {/* <Input
              value={name}
              size="md"
              placeholder="Enter your first name"
              onChangeText={(text) => setName(text)}
            /> */}
          </FormControl>

          <FormControl mb="4">
            <FormControl.Label>Email</FormControl.Label>
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
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
            {/* <Input
              value={email}
              size="md"
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
            /> */}
          </FormControl>

          <FormControl mb="4">
            <FormControl.Label>Password</FormControl.Label>
            {/* <Input
              value={password}
              size="md"
              placeholder="Enter make a password"
              onChangeText={(text) => setPassword(text)}
            /> */}
            <Input
              w={{
                base: "75%",
                md: "25%",
              }}
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

        <Box alignItems="center" mb="6">
          <Button
            size="lg"
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
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   inputContainer: {
//     width: "80%",
//   },
//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   button: {
//     backgroundColor: "#A267AC",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//   },
// });
