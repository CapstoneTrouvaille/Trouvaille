import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const image = require("../assets/trouvaillehomeback.png");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  //listens to firebase to see if the user is logged in, then do something if the user is logged in
  //this runs when the component mounts, pass in empty array so this only runs onece
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
        navigation.replace("Tabs")
      }
    });

    return unsubscribe;
    //when you leave the screen it unsubscribes from this listener, doesnt keep pinging it when it shouldn't
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Registered with: `, user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Logged in with: `, user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      // avoid the keyboard from covering login fields
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.inputContainer}>
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
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E9DAC4",
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
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#A267AC",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#A267AC",
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
