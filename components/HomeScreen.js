import { StyleSheet, Text, View, TouchableOpacity } from "react-native"; //rnfes
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import {db} from "../firebase"
import { doc, getDoc } from "firebase/firestore";

const test = async() =>{
  const docRef = doc(db, "user", "HverH3BQtzK50kfLORNK");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data().name);
  return docSnap.name
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}


const HomeScreen = async() => {
  const navigation = useNavigation();
  const testrun = await test()
  console.log("IN FUNC,", testrun)

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>

      <Text>TEST: {testrun}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E9DAC4",
  },
  button: {
    backgroundColor: "#A267AC",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
