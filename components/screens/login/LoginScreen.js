import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firebase, db } from "../../../firebase";
import { useNavigation } from "@react-navigation/core";
import * as Google from "expo-google-app-auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import styles from "../../../styles/loginScreen";
import { Ionicons } from "@expo/vector-icons";

const image = require("../../../assets/trouvaillehomeback.png");
const logo = require("../../../assets/TrouvailleMain.png");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  //GOOGLE
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { currentUser } = auth;
        dispatch(fetchUser(currentUser.uid));
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
  };

  //GOOGLE SIGNIN
  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser) => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        auth
          .signInAndRetrieveDataWithCredential(credential)
          .then(async () => {
            const { currentUser } = auth;
            const userRef = db.collection("user");
            const user = await userRef
              .where("UID", "==", auth.currentUser.uid || "")
              .get();

            const userInformation = user.docs[0];
            if (userInformation !== undefined) {
              dispatch(fetchUser(auth.currentUser.uid));
            } else {
              db.collection("user").add({
                name: currentUser.displayName,
                UID: currentUser.uid,
                email: currentUser.email,
                trip: [],
                photo: currentUser.photoURL,
              });
              dispatch(fetchUser(auth.currentUser.uid));
            }
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      } else {
        console.log("user already signed-in Firebase");
      }
    });
  };

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "483169550927-u414e7n9k0g1643jb42vk3v958r9h7h8.apps.googleusercontent.com",
        iosClientId:
          "483169550927-uimg0emiloj9g62h65f9dcou5oomsvq6.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        onSignIn(result);
      }
    } catch (error) {
      console.log(error);
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
            onPress={signInWithGoogleAsync}
            style={styles.googleButton}
          >
            <Text style={styles.googleText}>
              <Ionicons name="logo-google" size={17} color="white" />
              {"    "}
              Google Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            title="Register"
            onPress={() => navigation.navigate("SignUp")}
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
