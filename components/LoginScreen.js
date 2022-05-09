import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";

import * as Google from "expo-google-app-auth";
import { FontAwesome5 } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { fetchUser } from "./store/user";


const image = require("../assets/trouvaillehomeback.png");
const logo = require("../assets/TrouvailleMain.png");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();


  //GOOGLE
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const dispatch = useDispatch();


  //listens to firebase to see if the user is logged in, then do something if the user is logged in
  //this runs when the component mounts, pass in empty array so this only runs onece
  //when you leave the screen it unsubscribes from this listener, doesnt keep pinging it when it shouldn't

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


  // const handleSignUp = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredentials) => {
  //       const user = userCredentials.user;
  //       console.log(`Registered with: `, user.email);
  //     })
  //     .catch((error) => alert(error.message));
  // };


  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Logged in with: `, user.email);
      })
      .catch((error) => alert(error.message));
  };

  //GOOGLE SIGNIN
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "483169550927-hc31k451v8h377movghnbvp5at91mfbi.apps.googleusercontent.com",
        iosClientId:
          "483169550927-jaklnim83sh381ut3cfdnnb066tkk50k.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setAccessToken(result.accessToken);
        console.log("login with google success!");
        navigation.replace("Home");
      } else {
        console.log("Permission denied");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      console.log("data", data);
    });
  }
  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Image
          source={logo}
          resizeMode="center"
          style={styles.mainlogo}
        ></Image>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
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
            title="Register"
            onPress={() => navigation.navigate("SignUp")}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          {showUserInfo()}
          <FontAwesome5.Button
            title={accessToken ? "Get User Data" : "Log In With Google"}
            onPress={accessToken ? getUserData : signInWithGoogleAsync}
            style={styles.googleButton}
          ></FontAwesome5.Button>
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
  mainlogo: {
    flex: 0.5,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});
