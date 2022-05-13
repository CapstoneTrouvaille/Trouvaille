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
import { auth, firebase, db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import * as Google from "expo-google-app-auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/user";
import Googleicon from "react-native-google-button/src";

const image = require("../assets/trouvaillehomeback.png");
const logo = require("../assets/TrouvailleMain.png");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  //GOOGLE
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //listens to firebase to see if the user is logged in, then do something if the user is logged in
  //this runs when the component mounts, pass in empty array so this only runs onece
  //when you leave the screen it unsubscribes from this listener, doesnt keep pinging it when it shouldn't

  //***OMIT BC TAB NAV */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { currentUser } = auth;
        dispatch(fetchUser(currentUser.uid));
      }
    });
    return unsubscribe;
    //when you leave the screen it unsubscribes from this listener, doesnt keep pinging it when it shouldn't
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Logged in with: `, user);
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
        //sign in with credential from the Google user.
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
              console.log("user exists in firestore");
            } else {
              db.collection("user").add({
                name: currentUser.displayName,
                UID: currentUser.uid,
                email: currentUser.email,
                trip: [],
                photo: currentUser.photoURL,
              });
              dispatch(fetchUser(auth.currentUser.uid));
              console.log("new google user added to firestore");
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
      } else {
        console.log("Permission denied");
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
            title="Register"
            onPress={() => navigation.navigate("SignUp")}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.googleButtonContainer}>
          <Text style={styles.googleText}>
            <Googleicon onPress={signInWithGoogleAsync}>
              {" "}
              {"             "}Sign In with Google
            </Googleicon>
          </Text>
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
  googleButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  googleText: {
    color: "gray",
    fontWeight: "700",
    fontSize: 16,
  },
  googleButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
