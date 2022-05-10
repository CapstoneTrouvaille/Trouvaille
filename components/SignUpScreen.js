import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { signupUser } from "./store/user";

const image = require("../assets/trouvaillehomeback.png");

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();

  //   const handleSignUp = () => {
  //     // auth
  //     //   .createUserWithEmailAndPassword(email, password)
  //     //   .then((userCredentials) => {
  //     //     const user = userCredentials.user;
  //     //     console.log(`Registered with: `, user.email);
  //     //   })
  //     //   .catch((error) => alert(error.message));
  //   };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (name != "") {
                dispatch(signupUser(name, email, password));
              } else {
                alert("Please fill everything out to register!");
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#A267AC",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
